import { CdkDrag, CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDragSortEvent, CdkDropList, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Element } from 'src/app/code-base/element-defintions/element';
import { Guid } from 'guid-typescript';
import { RealElement } from 'src/app/code-base/real-element';

@Component({
   selector: 'app-element',
   templateUrl: './element.component.html',
   styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {

   @Input('element') element: RealElement;
   @Input() parentItem?: RealElement;

   @Input() set connectedDropListsIds(ids: string[]) { this.allDropListsIds = ids; }
   get connectedDropListsIds(): string[] { return this.allDropListsIds.filter(id => id !== this.element.uId); }

   @Output() itemDrop: EventEmitter<CdkDragDrop<RealElement>>;

   allDropListsIds: string[];
   get dragDisabled(): boolean { return !this.parentItem; }
   get parentItemId(): string { return this.dragDisabled ? '' : this.parentItem.uId; }

   constructor() {
      this.allDropListsIds = [];
      this.itemDrop = new EventEmitter();
   }

   ngOnInit(): void {
   }


   canEnter() {
      return (drag: CdkDrag<Element>, drop: CdkDropList<Element>) => {
         // console.log('canEneter', element, drag, drop);
         return true;
      };
   }

   onEnter($event: CdkDragEnter<Element[]>) {
      console.log('onEnter', $event);
   }
   onExit($event: CdkDragExit<Element[]>) {
      console.log('onExit', $event);
   }
   onDrop(event: CdkDragDrop<Element[]>) {
      console.log('onDrop', event);
      if (event.previousContainer === event.container) return;

      copyArrayItem(event.previousContainer.data,
         event.container.data,
         event.previousIndex,
         event.currentIndex);

      this.element.realChildren.push({
         uId: Guid.create().toString(),
         definition: event.item.data,
         // children: [],
         realChildren: [],
      });

   }


   onSort($event: CdkDragSortEvent<Element[]>) {
      // console.log('onSort', bodyElement, $event);
   }

   onDragDrop(event: CdkDragDrop<RealElement, RealElement>): void {
      this.itemDrop.emit(event);
   }
}
