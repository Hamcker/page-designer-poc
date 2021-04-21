import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementInstance, SerializedRealElement } from 'src/app/code-base/element-instance';

import { Binding } from 'src/app/code-base/binding';
import { EL_BODY } from 'src/app/code-base/element-defintions/body';
import { EL_COL } from 'src/app/code-base/element-defintions/col';
import { EL_INPUT } from 'src/app/code-base/element-defintions/input';
import { EL_ROW } from 'src/app/code-base/element-defintions/row';
import { EL_Repeater } from 'src/app/code-base/element-defintions/repeater';
import { ElementDefinition } from 'src/app/code-base/element-definition';
import { PROP_DATACONTEXT } from 'src/app/code-base/element-defintions/frequent-properties';
import { PageDesignService } from 'src/app/services/page-design.service';
import { take } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
   selector: 'app-elements-area',
   templateUrl: './elements-area.component.html',
   styleUrls: ['./elements-area.component.scss']
})
export class ElementsAreaComponent implements OnInit {

   rootElement: ElementInstance;

   get connectedDropListsIds(): string[] {
      // We reverse ids here to respect items nesting hierarchy
      // cdkDropLists should stay connected in order to be able to move items from one to another! biraz garip ama pek saçma değil
      return this.getIdsRecursive(this.rootElement).reverse();
   }

   @Output() dropListChange = new EventEmitter<string[]>();
   @Output() layoutChange = new EventEmitter<string>();
   @Output() dataContextChange = new EventEmitter<{}>();

   constructor(
      private pageDesignService: PageDesignService,
   ) {
   }

   ngOnInit(): void {
      timer(100).pipe(take(1)).subscribe(_ => this.dropListChange.emit(this.connectedDropListsIds));
      this.pageDesignService.layoutChange.subscribe(_ => {
         this.dropListChange.emit(this.connectedDropListsIds);
         this.generateLayoutJson();
      });

      this.setupOrtam();
      this.setupDataContext();
   }

   private setupOrtam() {
      const root = new ElementInstance(null, EL_BODY);

      // ------------------------------------------------------------------------------------------
      const row = new ElementInstance(root, EL_ROW);
      const col1 = new ElementInstance(row, EL_COL);

      const input1 = new ElementInstance(col1, EL_INPUT);
      input1.property('id').set('firstInp');
      col1.children.push(input1);

      const col2 = new ElementInstance(row, EL_COL);
      col2.property('width').bind('viewContext', '#firstInp.value');

      const input2 = new ElementInstance(col2, EL_INPUT);
      input2.property('value').bind('viewContext', '^Col.width');
      col2.children.push(input2);

      row.children.push(col1, col2);
      root.children.push(row);
      // ------------------------------------------------------------------------------------------
      const row2 = new ElementInstance(root, EL_ROW);
      const col3 = new ElementInstance(row2, EL_COL);

      const input3 = new ElementInstance(col3, EL_INPUT);
      input3.property('value').bind('dataContext', 'simpleNumber');
      input3.property('placeholder').value = 'bind to "simpleNumber"';
      col3.children.push(input3);

      const input5 = new ElementInstance(col3, EL_INPUT);
      input5.property('value').bind('dataContext', '^.address.city');
      input5.property('placeholder').value = 'bind to "^.address.city"';
      col3.children.push(input5);


      const col4 = new ElementInstance(row2, EL_COL);
      col4.property(PROP_DATACONTEXT.name).value = 'address';

      const input4 = new ElementInstance(col4, EL_INPUT);
      input4.property('value').bind('dataContext', 'city');
      col4.children.push(input4);

      const input6 = new ElementInstance(col4, EL_INPUT);
      input6.property('value').bind('dataContext', '^.address.city');
      input6.property('placeholder').value = 'bind to "^.address.city"';
      col4.children.push(input6);

      row2.children.push(col3, col4);
      root.children.push(row2);
      // ------------------------------------------------------------------------------------------

      const repeater1 = new ElementInstance(root, EL_Repeater);
      repeater1.property('items').bind('dataContext', 'phones');

      const input7 = new ElementInstance(repeater1, EL_INPUT);
      input7.property('value').bind('itemContext', 'value'); // phones[x].value
      repeater1.children.push(input7);
      root.children.push(repeater1);

      const repeater2 = new ElementInstance(root, EL_Repeater);
      repeater2.property('items').bind('dataContext', 'tags');

      const input8 = new ElementInstance(repeater2, EL_INPUT);
      input8.property('value').bind('itemContext', ''); // phones[x].value
      repeater2.children.push(input8);

      root.children.push(repeater2);

      // ------------------------------------------------------------------------------------------

      this.rootElement = root;
      // this.rootElement = new ElementInstance(null, EL_BODY);

   }

   private setupDataContext() {
      const dc = {
         simpleNumber: 6,
         setting: {
            pure: 6,
            sm: 12,
            lg: 4,
         },

         name: 'hamcker',
         address: {
            city: 'marand'
         },
         phones: [
            { type: 'mobile', value: '+989359861969' },
            { type: 'home', value: '+905538337789' },
         ],
         tags: [
            'developer',
            'software architecture'
         ]
      };
      this.pageDesignService.dataContext.next(dc);
   }

   private getIdsRecursive(item: ElementInstance): string[] {
      let ids = [item.uId];
      item.children.forEach(childItem => { ids = ids.concat(this.getIdsRecursive(childItem)) });
      return ids;
   }

   generateLayoutJson() {
      const layout = this.generateElementJson(this.rootElement);
      const layoutJson = JSON.stringify(layout);
      this.layoutChange.emit(layoutJson);
   }

   generateElementJson(element: ElementInstance): SerializedRealElement {
      const outlet: SerializedRealElement = {
         type: element.definition.name,
         properties: Object.fromEntries(element.properties.map(x => {
            const serializedProp = { ...x };
            delete serializedProp.definition;
            return [x.definition.name, serializedProp]
         })),
      };

      outlet.children = element.children.map(x => this.generateElementJson(x));

      return outlet;
   }

   onLayoutChange() {
      this.generateLayoutJson();
   }
}
