import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PageElement } from 'src/app/code-base/page-element';
import { ToolboxElement } from 'src/app/code-base/toolbox-element';

@Component({
   selector: 'app-element',
   templateUrl: './element.component.html',
   styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {

   @Input('element') element: PageElement;
   @Input() parentItem?: PageElement;

   @Input() set connectedDropListsIds(ids: string[]) { this.allDropListsIds = ids; }
   get connectedDropListsIds(): string[] { return this.allDropListsIds.filter(id => id !== this.element.uId); }

   @Output() itemDrop: EventEmitter<CdkDragDrop<PageElement>>;
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
      return (element: CdkDrag<ToolboxElement>, container: CdkDropList<PageElement>) => {
         return this.canBeDropedFromToolbox(container.data, element.data);
      };
   }

   onDragDrop(event: CdkDragDrop<PageElement, PageElement>): void {
      this.itemDrop.emit(event);
   }

   onRemoveClick() {
      const index = this.parentItem.children.findIndex(x => x.uId === this.element.uId);
      this.parentItem.children.splice(index, 1);
      this.layoutChange.emit();
   }


   private canBeDropedFromToolbox(container: PageElement, addingItem: ToolboxElement): boolean {
      const parentAccepts = container.definition.childrenTypes !== false && container.definition.childrenTypes.includes(addingItem.name);
      const childAccepts = addingItem.parentTypes !== false && addingItem.parentTypes.includes(container.definition.name);

      return parentAccepts && childAccepts;
   }

   onLayoutChange() {
      this.layoutChange.emit();
   }
}
