import { CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';

import { EL_BUTTON } from 'src/app/code-base/element-defintions/button';
import { EL_COL } from 'src/app/code-base/element-defintions/col';
import { EL_ROW } from 'src/app/code-base/element-defintions/row';
import { ToolboxElement } from 'src/app/code-base/toolbox-element';

@Component({
   selector: 'app-toolbox',
   templateUrl: './toolbox.component.html',
   styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {

   elements: ToolboxElement[] = [
      EL_ROW,
      EL_COL,
      EL_BUTTON,
   ];

   @Input() allDropListsIds: string[];

   constructor() { }

   ngOnInit(): void {
   }

}
