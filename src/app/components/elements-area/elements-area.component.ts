import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDragSortEvent, CdkDropList, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EL_BODY, EL_COL, EL_ROW, Element } from 'src/app/code-base/element-defintions/element';

import { Guid } from 'guid-typescript';
import { RealElement } from 'src/app/code-base/real-element';
import { remove } from 'lodash-es';
import { take } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
   selector: 'app-elements-area',
   templateUrl: './elements-area.component.html',
   styleUrls: ['./elements-area.component.scss']
})
export class ElementsAreaComponent implements OnInit {

   rootElement: RealElement;

   get connectedDropListsIds(): string[] {
      // We reverse ids here to respect items nesting hierarchy
      // cdkDropLists should stay connected in order to be able to move items from one to another! biraz garip ama pek saçma değil
      return this.getIdsRecursive(this.rootElement).reverse();
   }

   @Output() dropListChange = new EventEmitter<string[]>();

   constructor() {
      this.rootElement = new RealElement(EL_BODY);
   }

   ngOnInit(): void {
      timer(100).pipe(take(1)).subscribe(_ => this.dropListChange.emit(this.connectedDropListsIds));
   }

   public onDragDrop(event: CdkDragDrop<RealElement | Element>) {
      if (event.previousContainer.id === 'toolbox') {
         const ieEvent = event as CdkDragDrop<Element>;
         const addingItem = event.item.data as Element;
         const container = event.container.data as RealElement;

         if (this.canBeDropedFromToolbox(container, addingItem)) {
            (<RealElement>event.container.data).realChildren.push(new RealElement(ieEvent.item.data));
         }

      } else {
         event.container.element.nativeElement.classList.remove('active');
         const reEvent = event as CdkDragDrop<RealElement>;

         if (this.canBeDropped(reEvent)) {
            const movingItem: RealElement = reEvent.item.data;
            reEvent.container.data.realChildren.push(movingItem);
            reEvent.previousContainer.data.realChildren =
               reEvent.previousContainer.data.realChildren.filter((child) => child.uId !== movingItem.uId);
         } else {
            moveItemInArray(
               reEvent.container.data.realChildren,
               reEvent.previousIndex,
               reEvent.currentIndex
            );
         }
      }

      this.dropListChange.emit(this.connectedDropListsIds);
   }

   private getIdsRecursive(item: RealElement): string[] {
      let ids = [item.uId];
      item.realChildren.forEach(childItem => { ids = ids.concat(this.getIdsRecursive(childItem)) });
      return ids;
   }

   private canBeDropped(event: CdkDragDrop<RealElement, RealElement>): boolean {
      const movingItem: RealElement = event.item.data;

      return event.previousContainer.id !== event.container.id
         && this.isNotSelfDrop(event)
         && !this.hasChild(movingItem, event.container.data)
         && this.canBeDropedFromToolbox(event.container.data, movingItem.definition);
   }

   private isNotSelfDrop(event: CdkDragDrop<RealElement> | CdkDragEnter<RealElement> | CdkDragExit<RealElement>): boolean {
      return event.container.data.uId !== event.item.data.uId;
   }

   private hasChild(parentItem: RealElement, childItem: RealElement): boolean {
      const hasChild = parentItem.realChildren.some((item) => item.uId === childItem.uId);
      return hasChild ? true : parentItem.realChildren.some((item) => this.hasChild(item, childItem));
   }

   private canBeDropedFromToolbox(container: RealElement, addingItem: Element): boolean {
      const parentAccepts = container.definition.childrenTypes !== false && container.definition.childrenTypes.includes(addingItem.name);
      const childAccepts = addingItem.parentTypes !== false && addingItem.parentTypes.includes(container.definition.name);

      return parentAccepts && childAccepts;
   }
}
