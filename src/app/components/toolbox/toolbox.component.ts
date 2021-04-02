import { CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { EL_BUTTON, EL_COL, EL_ROW, Element } from 'src/app/code-base/element-defintions/element';

import { remove } from "lodash-es";

interface IElementWrapper {
   isTemporaryAdded?: boolean;
}

type TToolboxItem = Element & IElementWrapper;

@Component({
   selector: 'app-toolbox',
   templateUrl: './toolbox.component.html',
   styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {

   elements: TToolboxItem[] = [
      EL_ROW,
      EL_COL,
      EL_BUTTON,
   ];

   @Input() allDropListsIds: string[];

   constructor() { }

   ngOnInit(): void {
   }

   onEnter(event: CdkDragEnter<TToolboxItem[]>) {
      console.log('onToolboxEnter', event);
      // remove(event.container.data, x => x.isTemporaryAdded)
   }

   onExit(event: CdkDragExit<any>) {
      console.log('onToolboxExit', event);
      // const index = event.container.getSortedItems().findIndex(x => x.data.name === event.item.data.name);
      // this.elements.splice(index + 1, 0, { ...event.item.data, isTemporaryAdded: true });
   }
}
