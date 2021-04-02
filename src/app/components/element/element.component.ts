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
   @Output() layoutChange = new EventEmitter();

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
      return (element: CdkDrag<Element>, container: CdkDropList<RealElement>) => {
         return this.canBeDropedFromToolbox(container.data, element.data);
      };
   }

   onDragDrop(event: CdkDragDrop<RealElement, RealElement>): void {
      this.itemDrop.emit(event);
   }

   onRemoveClick() {
      const index = this.parentItem.children.findIndex(x => x.uId === this.element.uId);
      this.parentItem.children.splice(index, 1);
      this.layoutChange.emit();
   }


   private canBeDropedFromToolbox(container: RealElement, addingItem: Element): boolean {
      const parentAccepts = container.definition.childrenTypes !== false && container.definition.childrenTypes.includes(addingItem.name);
      const childAccepts = addingItem.parentTypes !== false && addingItem.parentTypes.includes(container.definition.name);

      return parentAccepts && childAccepts;
   }

   onLayoutChange() {
      this.layoutChange.emit();
   }
}
