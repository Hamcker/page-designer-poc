import { AfterViewInit, Component, EventEmitter, Injector, Output } from "@angular/core";
import { BehaviorSubject, Observable, asapScheduler, of, scheduled } from "rxjs";
import { debounceTime, map, mergeAll, mergeMap } from "rxjs/operators";

import { Binding } from "./binding";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { ElementInstance } from "./element-instance";
import { INJ_PAGE_ELEMENT } from "./injection-tokens";
import { PageDesignService } from "../services/page-design.service";
import { PropertyDesign } from "./property-design";
import { TPropertyValue } from "./types";

@Component({
   selector: 'bfc5aaa6-856f-453c-a2d8-a5f9fe2318ab',
   template: 'bfc5aaa6-856f-453c-a2d8-a5f9fe2318ab'
})
export abstract class BaseRenderer implements AfterViewInit {

   propertyValueCache: { [i: string]: BehaviorSubject<any> } = {};

   itemDrop = new EventEmitter<CdkDragDrop<ElementInstance>>();
   layoutChange = new EventEmitter();
   lifecycleEvents = new EventEmitter<string>(true);

   elementInstance: ElementInstance;
   dataContext: any;

   _pageDesignerService: PageDesignService;

   constructor(protected _injector: Injector) {
      this.elementInstance = _injector.get(INJ_PAGE_ELEMENT);
      this._pageDesignerService = _injector.get(PageDesignService);
   }

   ngAfterViewInit() {
      this.lifecycleEvents.emit('AfterViewInit');
   }

   onDragDrop(event: CdkDragDrop<ElementInstance>) {
      this.itemDrop.emit(event)
   }
   onLayoutChange() {
      this.layoutChange.emit();
   }

   get(name: string): Observable<Exclude<TPropertyValue, Binding>> {
      const instanceProperty = this.elementInstance?.properties?.find(x => x.definition.name === name);

      if (instanceProperty.valueType === 'static')
         return of(instanceProperty.value);
      else if (instanceProperty.valueType === 'dynamic') {
         if (this.propertyValueCache[name]) return this.propertyValueCache[name];

         this.propertyValueCache[name] = new BehaviorSubject<any>(null);
         this.listenToBinding(instanceProperty.value as Binding).subscribe(this.propertyValueCache[name]);

         return this.propertyValueCache[name];
      }
   }
   set(name: string, value: any): void {
      const instanceProperty = this.elementInstance?.properties?.find(x => x.definition.name === name);

      if (instanceProperty.valueType === 'static') {
         instanceProperty.value = value;
         this._pageDesignerService.viewContext.next();
      }
      else if (instanceProperty.valueType === 'dynamic')
         this.writeToBinding(instanceProperty.value as Binding, value);
   }

   private listenToBinding(binding: Binding): Observable<Exclude<TPropertyValue, Binding>> {
      return scheduled([
         this._pageDesignerService.layoutChange,
         this._pageDesignerService.dataContext,
         this._pageDesignerService.viewContext,
      ], asapScheduler)
         .pipe(
            mergeAll(),
            debounceTime(50),
            mergeMap(_ => this.resolveBinding(binding))
         );
   }

   private resolveBinding(binding: Binding): Observable<Exclude<TPropertyValue, Binding>> {
      switch (binding.source) {
         case 'dataContext':
            return this.getValueFromDataContext(binding.path);
            break;

         case 'viewContext':
            return this.getValueFromViewContext(binding.path);
            break;
      }
   }

   private writeToBinding(binding: Binding, value: any) {
      switch (binding.source) {
         case 'dataContext':
            this.setValueToDataContext(binding.path, value);
            break;

         case 'viewContext':
            this.setValueToViewContext(binding.path, value);
            break;
      }
   }

   private getValueFromDataContext(path: string): Observable<Exclude<TPropertyValue, Binding>> {
      const dataContext = this._pageDesignerService.dataContext.value;

      if (path.startsWith('.')) {
         // TODO get from injection
      } else {
         return of(this.deepFindValue(dataContext, path));
      }
   }
   private setValueToDataContext(path: string, value: any): void {
      const dataContext = this._pageDesignerService.dataContext.value;

      if (path.startsWith('.')) {
         // TODO get from injection
      } else {
         const objectPathArr = path.split('.');
         const key = objectPathArr[objectPathArr.length - 1];
         let obj = dataContext;

         if (objectPathArr.length !== 1) {
            const objectPath = objectPathArr.slice(0, objectPathArr.length - 2); // skip last (leaf)
            obj = this.deepFindValue(dataContext, objectPath.join('.'))
         }

         obj[key] = value;
      }

      // fire changes on dataContext (new state)
      this._pageDesignerService.dataContext.next(dataContext);
   }

   private getValueFromViewContext(path: string): Observable<Exclude<TPropertyValue, Binding>> {
      let property: PropertyDesign;
      const [firstPart, restOfPath] = path.slice(1).split('.');

      if (path.startsWith('#')) {
         const pageElement = this.findPageElementById(firstPart, this.getRootElement());
         property = this.getProperty(pageElement, restOfPath);
      } else if (path.startsWith('^')) {
         const ancentorElement = this.findMyAncentor(firstPart);
         property = !!restOfPath ? this.getProperty(ancentorElement, restOfPath) : this.getProperty(this.elementInstance.parent, firstPart);
      }

      if (property.valueType !== 'dynamic') return of(property.value);
      return this.listenToBinding(property.value as Binding);
   }
   private setValueToViewContext(path: string, value: any): void {
      let property: PropertyDesign;
      const [firstPart, restOfPath] = path.slice(1).split('.');

      if (path.startsWith('#')) {
         const pageElement = this.findPageElementById(firstPart, this.getRootElement());
         property = this.getProperty(pageElement, restOfPath);
      } else if (path.startsWith('^')) {
         const ancentorElement = this.findMyAncentor(firstPart);
         property = !!restOfPath ? this.getProperty(ancentorElement, restOfPath) : this.getProperty(this.elementInstance.parent, firstPart);
      }

      property.value = value;
      this.writeToBinding(property.value as Binding, value);

      this._pageDesignerService.layoutChange.next();
   }

   private getRootElement(): ElementInstance {
      let currentElement = this.elementInstance;

      while (currentElement) {
         if (!currentElement.parent) return currentElement;
         currentElement = currentElement.parent;
      }
   }

   private deepFindValue(obj: object, path: string): any {
      const paths = path.split('.');
      let current = obj;
      let i: number;

      for (i = 0; i < paths.length; ++i) {
         if (current[paths[i]] == undefined) {
            return undefined;
         } else {
            current = current[paths[i]];
         }
      }
      return current;
   }

   private findPageElementById(id: string, rootElement: ElementInstance): ElementInstance {
      if (this.getPropertyValue(rootElement, 'id') === id) return rootElement;
      return rootElement.children.map(c => this.findPageElementById(id, c)).find(x => !!x);
   }

   private findMyAncentor(name: string, skip = 0): ElementInstance {
      let currentItem = this.getRootElement().parent;
      do {
         if (currentItem.definition.name !== name) continue;
         if (--skip === -1)
            return currentItem;
      } while (currentItem = currentItem.parent);
   }

   private getProperty(element: ElementInstance, key: string): PropertyDesign {
      return element.properties.find(x => x.definition.name === key);
   }
   private getPropertyValue(element: ElementInstance, key: string): Exclude<TPropertyValue, Binding> {
      return element.properties.find(x => x.definition.name === key)?.value;
   }
}
