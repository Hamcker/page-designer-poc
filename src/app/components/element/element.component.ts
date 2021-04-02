import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Inject, Injector, Input, OnInit, Output, ReflectiveInjector, StaticProvider, TemplateRef, Type, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { INJ_CHILDREN, INJ_DROP_LISTS, INJ_PAGE_ELEMENT } from 'src/app/code-base/injection-tokens';

import { PageElement } from 'src/app/code-base/page-element';
import { RendererRepository } from 'src/app/code-base/repositories/renderer-repository';
import { ToolboxElement } from 'src/app/code-base/toolbox-element';

export type Content<T> = string | TemplateRef<T> | Type<T>;

@Component({
   selector: 'app-element',
   templateUrl: './element.component.html',
   styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit, AfterViewInit {

   @Input('element') element: PageElement;
   @Input() parentItem?: PageElement;

   @Input() set connectedDropListsIds(ids: string[]) { this.allDropListIds = ids; }
   get connectedDropListsIds(): string[] { return this.allDropListIds.filter(id => id !== this.element.uId); }

   @Output() itemDrop = new EventEmitter<CdkDragDrop<PageElement>>();
   @Output() layoutChange = new EventEmitter();

   @ViewChild('childrenHost', { read: ViewContainerRef }) childrenHost: ViewContainerRef;
   @ViewChild('children', { read: TemplateRef }) children: TemplateRef<any>;

   allDropListIds: string[];
   get dragDisabled(): boolean { return !this.parentItem; }
   get parentItemId(): string { return this.dragDisabled ? '' : this.parentItem.uId; }

   constructor(
      private cfr: ComponentFactoryResolver,
      private cdr: ChangeDetectorRef,
      private injector: Injector,
      @Inject(DOCUMENT) private document: Document
   ) {
      this.allDropListIds = [];
   }

   ngOnInit(): void {
   }

   ngAfterViewInit() {
      this.redraw();
      this.cdr.detectChanges();
   }

   //#region Event Handlers
   onDragDrop(event: CdkDragDrop<PageElement, PageElement>): void {
      this.itemDrop.emit(event);
      this.redraw();
   }

   onRemoveClick() {
      const index = this.parentItem.children.findIndex(x => x.uId === this.element.uId);
      this.parentItem.children.splice(index, 1);
      this.layoutChange.emit();
   }

   onLayoutChange() {
      this.layoutChange.emit();
      this.redraw();
   }
   //#endregion



   //#region UI Helpers
   canEnter() {
      return (element: CdkDrag<ToolboxElement>, container: CdkDropList<PageElement>) => {
         if (!container.data || !element.data) return false;

         return this.canBeDropedFromToolbox(container.data, element.data);
      };
   }
   //#endregion




   //#region Helpers
   private canBeDropedFromToolbox(container: PageElement, addingItem: ToolboxElement): boolean {
      const parentAccepts = container.definition.childrenTypes !== false && container.definition.childrenTypes.includes(addingItem.name);
      const childAccepts = addingItem.parentTypes !== false && addingItem.parentTypes.includes(container.definition.name);

      return parentAccepts && childAccepts;
   }

   private redraw() {
      const componentType = RendererRepository.get(this.element.definition.name).componentType;

      const rendererFactory = this.cfr.resolveComponentFactory<BaseRenderer>(componentType);
      const injector = this.getInjector();
      // const content = this.resolveNgContent(this.children);
      // const componentRef = rendererFactory.create(this.injector, content);

      this.childrenHost.clear();
      const componentRef = this.childrenHost.createComponent(rendererFactory, 0, injector);
      componentRef.instance.itemDrop.subscribe(x => this.itemDrop.emit(x));
      componentRef.instance.layoutChange.subscribe(x => this.layoutChange.emit(x));
   }

   private resolveNgContent<T>(content: Content<T>): any[][] {
      if (typeof content === 'string') {
         const element = this.document.createTextNode(content);
         return [[element]];
      }

      if (content instanceof TemplateRef) {
         const viewRef = content.createEmbeddedView(null);
         console.log(viewRef)
         // In earlier versions, you may need to add this line
         // this.appRef.attachView(viewRef);
         return [viewRef.rootNodes];
      }

      const factory = this.cfr.resolveComponentFactory(content);
      const componentRef = factory.create(this.injector);
      return [[componentRef.location.nativeElement], [this.document.createTextNode('Second ng-content')]];
   }

   private getInjector(): Injector {

      const options: {
         providers: StaticProvider[];
         parent?: Injector;
         name?: string;
      } = {
         parent: this.injector,
         providers: [
            { provide: INJ_PAGE_ELEMENT, useValue: this.element },
            { provide: INJ_CHILDREN, useValue: this.element.children },
            { provide: INJ_DROP_LISTS, useValue: this.connectedDropListsIds },
         ]
      }

      return Injector.create(options);
   }
   //#endregion
}
