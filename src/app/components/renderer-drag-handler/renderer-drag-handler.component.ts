import { Component, Host, HostBinding, Inject, Input, OnInit } from '@angular/core';

import { INJ_PAGE_ELEMENT } from 'src/app/code-base/injection-tokens';
import { PageElement } from 'src/app/code-base/page-element';
import { RendererOutletComponent } from '../renderer-outlet/renderer-outlet.component';
import { TRenderMode } from 'src/app/code-base/types';

@Component({
   selector: 'renderer-drag-handler',
   templateUrl: './renderer-drag-handler.component.html',
   styleUrls: ['./renderer-drag-handler.component.scss']
})
export class RendererDragHandlerComponent implements OnInit {

   @Input() dragDisabled: boolean;
   @HostBinding('class.hidden') hidden: boolean = false;

   constructor(
      private parentRendererOutlet: RendererOutletComponent,
   ) {
      // this.hidden = renderMode == 'design';
      // this.dragDisabled ??= !this.parentRendererOutlet.parentElement;
   }

   ngOnInit(): void {
   }


   onRemoveClick() {
      // const index = this.parentRendererOutlet.parentElement.children.findIndex(x => x.uId === this.element.uId);
      // this.parentRendererOutlet.parentElement.children.splice(index, 1);
   }
}
