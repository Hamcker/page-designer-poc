import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageElement, SerializedRealElement } from 'src/app/code-base/page-element';

import { EL_BODY } from 'src/app/code-base/element-defintions/body';
import { PageDesignService } from 'src/app/services/page-design.service';
import { ToolboxElement } from 'src/app/code-base/toolbox-element';
import { take } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
   selector: 'app-elements-area',
   templateUrl: './elements-area.component.html',
   styleUrls: ['./elements-area.component.scss']
})
export class ElementsAreaComponent implements OnInit {

   rootElement: PageElement;

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
      this.rootElement = new PageElement(null, EL_BODY);
   }

   ngOnInit(): void {
      timer(100).pipe(take(1)).subscribe(_ => this.dropListChange.emit(this.connectedDropListsIds));
      this.pageDesignService.layoutChange.subscribe(_ => this.dropListChange.emit(this.connectedDropListsIds));
   }


   private getIdsRecursive(item: PageElement): string[] {
      let ids = [item.uId];
      item.children.forEach(childItem => { ids = ids.concat(this.getIdsRecursive(childItem)) });
      return ids;
   }

   generateLayoutJson() {
      const layout = this.generateElementJson(this.rootElement);
      const layoutJson = JSON.stringify(layout);
      this.layoutChange.emit(layoutJson);
   }

   generateElementJson(element: PageElement): SerializedRealElement {
      const outlet: SerializedRealElement = { type: element.definition.name, properties: element.properties };

      outlet.children = element.children.map(x => this.generateElementJson(x));

      return outlet;
   }

   onLayoutChange() {
      this.generateLayoutJson();
   }
}
