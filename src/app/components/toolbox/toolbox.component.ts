import { CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';

import { EL_BUTTON } from 'src/app/code-base/element-defintions/button';
import { EL_COL } from 'src/app/code-base/element-defintions/col';
import { EL_INPUT } from 'src/app/code-base/element-defintions/input';
import { EL_ROW } from 'src/app/code-base/element-defintions/row';
import { ElementDefinition } from 'src/app/code-base/element-definition';

@Component({
   selector: 'app-toolbox',
   templateUrl: './toolbox.component.html',
   styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {

   elements: ElementDefinition[] = [
      EL_ROW,
      EL_COL,
      EL_BUTTON,
      EL_INPUT,
   ];

   @Input() allDropListsIds: string[];

   constructor() { }

   ngOnInit(): void {
   }

}
