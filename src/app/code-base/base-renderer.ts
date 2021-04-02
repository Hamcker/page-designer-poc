import { EventEmitter, Output } from "@angular/core";

import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { PageElement } from "./page-element";

export abstract class BaseRenderer {
   abstract children: PageElement[];
   abstract element: PageElement;
   abstract connectedDropListsIds: string[];

   itemDrop = new EventEmitter<CdkDragDrop<PageElement>>();
   layoutChange = new EventEmitter();

   onDragDrop(event: CdkDragDrop<PageElement>) {
      this.itemDrop.emit(event)
   }
   onLayoutChange() {
      this.layoutChange.emit();
   }
}
