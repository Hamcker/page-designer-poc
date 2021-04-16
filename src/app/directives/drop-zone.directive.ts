import { Directionality } from '@angular/cdk/bidi';
import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDropList, CdkDropListGroup, CDK_DRAG_CONFIG, CDK_DROP_LIST, CDK_DROP_LIST_GROUP, DragDrop, DragDropConfig, moveItemInArray } from '@angular/cdk/drag-drop';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Input, SkipSelf } from '@angular/core';
import { ChangeDetectorRef, Directive, ElementRef, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { INJ_PAGE_ELEMENT } from '../code-base/injection-tokens';
import { ElementInstance } from '../code-base/element-instance';
import { ElementDefinition } from '../code-base/element-definition';
import { TRenderMode } from '../code-base/types';
import { RendererOutletComponent } from '../components/renderer-outlet/renderer-outlet.component';
import { PageDesignService } from '../services/page-design.service';

@Directive({
   selector: '[DropZone],[drop-zone]',
   exportAs: 'dropZone',
   providers: [
      // Prevent child drop lists from picking up the same group as their parent.
      { provide: CDK_DROP_LIST_GROUP, useValue: undefined },
      { provide: CDK_DROP_LIST, useExisting: CdkDropList },
   ],
   host: {
      'class': 'cdk-drop-list drop-zone',
      '[attr.id]': 'id',
      '[class.cdk-drop-list-disabled]': 'disabled',
      '[class.cdk-drop-list-dragging]': '_dropListRef.isDragging()',
      '[class.cdk-drop-list-receiving]': '_dropListRef.isReceiving()',
   }
})
export class DropZoneDirective extends CdkDropList<ElementInstance> {

   @Input('drop-zone') slot: string = 'default';

   constructor(
      element: ElementRef<HTMLElement>,
      dragDrop: DragDrop,
      _changeDetectorRef: ChangeDetectorRef,
      _scrollDispatcher: ScrollDispatcher,
      private pageDesignService: PageDesignService,
      private parentRendererOutlet: RendererOutletComponent,
      @Inject(INJ_PAGE_ELEMENT) private pageElement: ElementInstance,
      @Optional() _dir?: Directionality,
      @Optional() @Inject(CDK_DROP_LIST_GROUP) @SkipSelf() _group?: CdkDropListGroup<CdkDropList>,
      @Optional() @Inject(CDK_DRAG_CONFIG) config?: DragDropConfig,
   ) {
      super(
         element,
         dragDrop,
         _changeDetectorRef,
         _scrollDispatcher,
         _dir,
         _group,
         config,
      );

      this.data = pageElement;
      this.id = pageElement.uId;
      this.enterPredicate = this.canEnter();

      this.dropped.subscribe(event => this.onDragDrop(event));

      this.pageDesignService.dropListsChange.subscribe(ids => {
         const connectedIds = ids
            .filter(x => x !== this.pageElement.uId);

         this.connectedTo = connectedIds;
      });
   }


   private onDragDrop(event: CdkDragDrop<ElementInstance | ElementDefinition>) {
      if (!event.item.data || !event.container.data) return;

      if (event.previousContainer.id === 'toolbox') {
         const ieEvent = event as CdkDragDrop<ElementDefinition>;
         const addingItem = event.item.data as ElementDefinition;
         const container = event.container.data as ElementInstance;
         const parentElement = event.container.data as ElementInstance;

         if (this.canBeDropedFromToolbox(container, addingItem)) {
            const child = new ElementInstance(parentElement, ieEvent.item.data);
            child.slot = this.slot;
            parentElement.children.push(child);
            this.parentRendererOutlet.logicalTreeChange.next({ parent: this.pageElement, child, slot: this.slot });
         }

      } else {
         event.container.element.nativeElement.classList.remove('active');
         const reEvent = event as CdkDragDrop<ElementInstance>;

         if (this.canBeDropped(reEvent)) {
            const movingItem: ElementInstance = reEvent.item.data;
            reEvent.container.data.children.push(movingItem);
            reEvent.previousContainer.data.children =
               reEvent.previousContainer.data.children.filter((child) => child.uId !== movingItem.uId);
         } else {
            moveItemInArray(
               reEvent.container.data.children,
               reEvent.previousIndex,
               reEvent.currentIndex
            );
         }
      }

      this.pageDesignService.layoutChange.next();
   }

   canEnter() {
      return (element: CdkDrag<ElementDefinition>, container: CdkDropList<ElementInstance>) => {
         if (!container.data || !element.data) return false;
         const outlet = this.canBeDropedFromToolbox(container.data, element.data);
         console.log('can enter', element.data.name, 'to', container.data.definition.name, '?', outlet);
         return outlet;
      };
   }

   private canBeDropedFromToolbox(container: ElementInstance, addingItem: ElementDefinition | ElementInstance): boolean {
      if (addingItem instanceof ElementDefinition) {
         const parentAccepts = container.definition.childrenTypes !== false && container.definition.childrenTypes.includes(addingItem.name);
         const childAccepts = addingItem.parentTypes !== false && addingItem.parentTypes.includes(container.definition.name);

         return parentAccepts && childAccepts;
      } else {
         const parentAccepts = container.definition.childrenTypes !== false && container.definition.childrenTypes.includes(addingItem.definition.name);
         const childAccepts = addingItem.definition.parentTypes !== false && addingItem.definition.parentTypes.includes(container.definition.name);

         return parentAccepts && childAccepts;
      }
   }


   private canBeDropped(event: CdkDragDrop<ElementInstance, ElementInstance>): boolean {
      const movingItem: ElementInstance = event.item.data;

      return event.previousContainer.id !== event.container.id
         && this.isNotSelfDrop(event)
         && !this.hasChild(movingItem, event.container.data)
         && this.canBeDropedFromToolbox(event.container.data, movingItem.definition);
   }

   private isNotSelfDrop(event: CdkDragDrop<ElementInstance> | CdkDragEnter<ElementInstance> | CdkDragExit<ElementInstance>): boolean {
      return event.container.data.uId !== event.item.data.uId;
   }

   private hasChild(parentItem: ElementInstance, childItem: ElementInstance): boolean {
      const hasChild = parentItem.children.some((item) => item.uId === childItem.uId);
      return hasChild ? true : parentItem.children.some((item) => this.hasChild(item, childItem));
   }
}
