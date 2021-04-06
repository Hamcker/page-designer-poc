import { AfterViewInit, Component, EventEmitter, Injector, Output } from "@angular/core";

import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { PageElement } from "./page-element";

@Component({
   selector: 'bfc5aaa6-856f-453c-a2d8-a5f9fe2318ab',
   template: 'bfc5aaa6-856f-453c-a2d8-a5f9fe2318ab'
})
export abstract class BaseRenderer implements AfterViewInit {

   itemDrop = new EventEmitter<CdkDragDrop<PageElement>>();
   layoutChange = new EventEmitter();
   lifecycleEvents = new EventEmitter<string>(true);


   constructor(protected _injector: Injector) {
   }

   ngAfterViewInit() {
      this.lifecycleEvents.emit('AfterViewInit');
   }

   onDragDrop(event: CdkDragDrop<PageElement>) {
      this.itemDrop.emit(event)
   }
   onLayoutChange() {
      this.layoutChange.emit();
   }
}
