import { AfterViewInit, Component, EventEmitter, Injector, OnInit, Output } from "@angular/core";
import { BehaviorSubject, Observable, asapScheduler, of, scheduled } from "rxjs";
import { debounceTime, map, mergeAll, mergeMap, tap } from "rxjs/operators";

import { Binding } from "./binding";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { ElementInstance } from "./element-instance";
import { INJ_PAGE_ELEMENT } from "./injection-tokens";
import { PageDesignService } from "../services/page-design.service";
import { PropertyDesign } from "./property-design";
import { TPropertyValue } from "./types";
import { deepFindValue } from "./deep-find";
import { PROP_DATACONTEXT } from "./element-defintions/frequent-properties";

export type TDataContextType = 'primitive' | 'object' | 'array';

@Component({
   selector: 'bfc5aaa6-856f-453c-a2d8-a5f9fe2318ab',
   template: 'bfc5aaa6-856f-453c-a2d8-a5f9fe2318ab'
})
export abstract class BaseRenderer implements OnInit, AfterViewInit {

   observableCache: { [i: string]: BehaviorSubject<any> } = {};

   itemDrop = new EventEmitter<CdkDragDrop<ElementInstance>>();
   layoutChange = new EventEmitter();
   lifecycleEvents = new EventEmitter<string>(true);

   elementInstance: ElementInstance;
   dataContextType: TDataContextType;
   dataContext: any;

   #pageDesignerService: PageDesignService;

   constructor(protected _injector: Injector) {
      this.elementInstance = _injector.get(INJ_PAGE_ELEMENT);
      this.#pageDesignerService = _injector.get(PageDesignService);
      this.getDataContext();
   }

   ngOnInit() {
      this.lifecycleEvents.emit('OnInit');
   }

   ngAfterViewInit() {
      this.lifecycleEvents.emit('AfterViewInit');
   }

   onDragDrop(event: CdkDragDrop<ElementInstance>) {
      this.itemDrop.emit(event);
   }
   onLayoutChange() {
      this.layoutChange.emit();
   }

   get(name: string): Observable<Exclude<TPropertyValue, Binding>> {
      const instanceProperty = this.elementInstance?.properties?.find(x => x.definition.name === name);

      if (instanceProperty.valueType === 'static')
         return of(instanceProperty.value);
      else if (instanceProperty.valueType === 'dynamic') {
         return this.cacheObservable(name, this.listenToBinding(instanceProperty.value as Binding));
      }
   }
   set(name: string, value: any): void {
      const instanceProperty = this.elementInstance?.properties?.find(x => x.definition.name === name);

      if (instanceProperty.valueType === 'static') {
         instanceProperty.value = value;
         this.#pageDesignerService.viewContext.next();
      }
      else if (instanceProperty.valueType === 'dynamic')
         this.writeToBinding(instanceProperty.value as Binding, value);
   }

   private listenToBinding(binding: Binding): Observable<Exclude<TPropertyValue, Binding>> {
      return scheduled([
         this.#pageDesignerService.layoutChange,
         this.#pageDesignerService.dataContext,
         this.#pageDesignerService.viewContext,
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
      const valueObservable = this.#pageDesignerService.dataContext
         .pipe(
            map(dataContext => {
               const dataContextPath = this.elementInstance.property(PROP_DATACONTEXT.name)?.value as string ?? '';
               if (dataContextPath.startsWith('^.')) {
                  return deepFindValue(dataContext, dataContextPath.slice(2));

               } else {
                  const path = this.getDataContextPaths();
                  return deepFindValue(dataContext, path);
               }
            }),
            tap(x => this.dataContext = x),
            map(dx => {
               if (path.startsWith('^.')) {
                  const dx = this.#pageDesignerService.dataContext.value;
                  return deepFindValue(dx, path.slice(2));

               } else {
                  return deepFindValue(this.dataContext, path);
               }
            })
         );

      return this.cacheObservable(this.elementInstance.uId + '--' + path, valueObservable);
   }
   private setValueToDataContext(path: string, value: any): void {
      const objectPathArr = path.split('.');
      const key = objectPathArr[objectPathArr.length - 1];
      let dataContext = this.dataContext;

      if (objectPathArr.length !== 1) {
         const objectPath = objectPathArr.slice(0, objectPathArr.length - 2); // skip last (leaf)
         dataContext = deepFindValue(this.dataContext, objectPath.join('.'))
      }

      dataContext[key] = value;

      // fire changes on dataContext (new state)
      this.#pageDesignerService.dataContextChange.next();
   }

   private getValueFromViewContext(path: string): Observable<Exclude<TPropertyValue, Binding>> {
      let property: PropertyDesign;
      const match = (/(?:^#(?<elementId>\w+)|^(?<skipCount>\d*)?\^(?<elementType>\w+))\.(?<bindingPath>[\w+\.]+)/gi).exec(path);
      const { elementId, skipCount, elementType, bindingPath } = match.groups;

      if (!!elementId) {
         const pageElement = this.findPageElementById(elementId, this.getRootElement());
         property = pageElement.property(bindingPath);
      } else if (!!elementType) {
         const ancentorElement = this.findMyAncentor(elementType, parseInt(skipCount, 10));
         property = !!bindingPath ?
            ancentorElement.property(bindingPath) :
            this.elementInstance.parent.property(elementType);
      }

      if (property.valueType !== 'dynamic') return of(property.value);
      return this.cacheObservable(path, this.listenToBinding(property.value as Binding));

   }
   private setValueToViewContext(path: string, value: any): void {
      let property: PropertyDesign;
      const match = (/(?:^#(?<elementId>\w+)|^(?<skipCount>\d*)?\^(?<elementType>\w+))\.(?<bindingPath>[\w+\.]+)/gi).exec(path);
      const { elementId, skipCount, elementType, bindingPath } = match.groups;

      if (!!elementId) {
         const pageElement = this.findPageElementById(elementId, this.getRootElement());
         property = pageElement.property(bindingPath);
      } else if (!!elementType) {
         const ancentorElement = this.findMyAncentor(elementType, parseInt(skipCount, 10));
         property = !!bindingPath ?
            ancentorElement.property(bindingPath) :
            this.elementInstance.parent.property(elementType);
      }

      if (property.valueType !== 'dynamic')
         property.value = value;
      else
         this.writeToBinding(property.value as Binding, value);

      this.#pageDesignerService.layoutChange.next();
   }

   private getRootElement(): ElementInstance {
      let currentElement = this.elementInstance;

      while (currentElement) {
         if (!currentElement.parent) return currentElement;
         currentElement = currentElement.parent;
      }
   }

   private findPageElementById(id: string, rootElement: ElementInstance): ElementInstance {
      if (rootElement.property('id')?.value === id) return rootElement;
      return rootElement.children.map(c => this.findPageElementById(id, c)).find(x => !!x);
   }

   private findMyAncentor(name: string, skip = 0): ElementInstance {
      let currentItem = this.elementInstance;
      if (isNaN(skip)) skip = 0;

      do {
         if (currentItem.definition.name !== name) continue;
         if (--skip === -1)
            return currentItem;
      } while (currentItem = currentItem.parent);
   }


   private cacheObservable<T>(key: string, source: Observable<T>): Observable<T> {
      if (this.observableCache[key]) return this.observableCache[key];

      this.observableCache[key] = new BehaviorSubject<any>(null);
      source.subscribe(this.observableCache[key]);

      return this.observableCache[key];
   }

   private getDataContext(): void {
      this.#pageDesignerService.dataContext.subscribe(dataContext => {
         const dataContextPath = this.elementInstance.property(PROP_DATACONTEXT.name)?.value as string ?? '';
         if (dataContextPath.startsWith('^.')) {
            this.dataContext = deepFindValue(dataContext, dataContextPath.slice(2));

         } else {
            const path = this.getDataContextPaths();
            this.dataContext = deepFindValue(dataContext, path);
         }
      });
   }

   private getDataContextPaths(): string {
      let currentElement = this.elementInstance;
      let outlet = [];

      while (currentElement) {
         const currentElementsDataContextPath = currentElement.property(PROP_DATACONTEXT.name)?.value as string ?? '';
         if (currentElementsDataContextPath.startsWith('^.')) {
            outlet = [];
            outlet.unshift(currentElementsDataContextPath.slice(2));

         } else {
            outlet.unshift(currentElementsDataContextPath);
         }

         currentElement = currentElement.parent;
      }

      return outlet.filter(x => !!x && x.length > 0).join('.');
   }
}
