import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Inject, Injector, Input, OnInit, Output, ReflectiveInjector, StaticProvider, TemplateRef, Type, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { INJ_CHILDREN, INJ_PAGE_ELEMENT } from 'src/app/code-base/injection-tokens';

import { PageElement } from 'src/app/code-base/page-element';
import { RendererRepository } from 'src/app/code-base/repositories/renderer-repository';
import { ToolboxElement } from 'src/app/code-base/toolbox-element';



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
      this.cdr.detectChanges();
   }

   //#region Event Handlers
   onDragDrop(event: CdkDragDrop<PageElement, PageElement>): void {
      this.itemDrop.emit(event);
   }

   onRemoveClick() {
      const index = this.parentItem.children.findIndex(x => x.uId === this.element.uId);
      this.parentItem.children.splice(index, 1);
      this.layoutChange.emit();
   }

   onLayoutChange() {
      this.layoutChange.emit();
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


   //#endregion
}
