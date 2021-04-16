import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ElementInstance, SerializedRealElement } from 'src/app/code-base/element-instance';

import { Binding } from 'src/app/code-base/binding';
import { EL_BODY } from 'src/app/code-base/element-defintions/body';
import { EL_COL } from 'src/app/code-base/element-defintions/col';
import { EL_INPUT } from 'src/app/code-base/element-defintions/input';
import { EL_ROW } from 'src/app/code-base/element-defintions/row';
import { ElementDefinition } from 'src/app/code-base/element-definition';
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

   constructor(
      private pageDesignService: PageDesignService,
   ) {
      this.setupOrtam();
   }

   ngOnInit(): void {
      timer(100).pipe(take(1)).subscribe(_ => this.dropListChange.emit(this.connectedDropListsIds));
      this.pageDesignService.layoutChange.subscribe(_ => {
         this.dropListChange.emit(this.connectedDropListsIds);
         this.generateLayoutJson();
      });
   }

   private setupOrtam() {
      const root = new ElementInstance(null, EL_BODY);

      const row = new ElementInstance(root, EL_ROW);

      const col1 = new ElementInstance(row, EL_COL);

      const input1 = new ElementInstance(col1, EL_INPUT);
      const input1Id = input1.properties.find(x => x.definition.name === 'id');
      input1Id.valueType = 'static';
      input1Id.value = 'firstInp';
      col1.children.push(input1);

      const col2 = new ElementInstance(row, EL_COL);
      const col2Width = col2.properties.find(x => x.definition.name === 'width');
      col2Width.valueType = 'dynamic';
      col2Width.value = new Binding({
         source: 'viewContext',
         path: '#firstInp.value'
      });

      // const input2 = new ElementInstance(col2, EL_INPUT);
      // const input2Id = input2.properties.find(x => x.definition.name === 'id');
      // input2Id.valueType = 'static';
      // input2Id.value = 'firstInp';
      // col2.children.push(input2);

      row.children.push(col1);
      row.children.push(col2);

      root.children.push(row);

      this.rootElement = root;
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
