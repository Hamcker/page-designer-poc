import { Component, Host, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { INJ_CHILDREN, INJ_PAGE_ELEMENT, INJ_RENDER_MODE } from 'src/app/code-base/injection-tokens';
import { PageElement } from 'src/app/code-base/page-element';
import { TRenderMode } from 'src/app/code-base/types';
import { RendererOutletComponent } from '../renderer-outlet/renderer-outlet.component';

@Component({
   selector: 'renderer-drag-handler',
   templateUrl: './renderer-drag-handler.component.html',
   styleUrls: ['./renderer-drag-handler.component.scss']
})
export class RendererDragHandlerComponent implements OnInit {

   @Input() dragDisabled: boolean;
   @HostBinding('class.hidden') hidden: boolean = false;

   constructor(
      @Inject(INJ_CHILDREN) public children: PageElement[],
      @Inject(INJ_PAGE_ELEMENT) public element: PageElement,
      @Inject(INJ_RENDER_MODE) public renderMode: TRenderMode,
      private parentRendererOutlet: RendererOutletComponent,
   ) {
      this.hidden = renderMode == 'design';
      this.dragDisabled ??= !this.parentRendererOutlet.parentElement;
   }

   ngOnInit(): void {
   }


   onRemoveClick() {
      const index = this.parentRendererOutlet.parentElement.children.findIndex(x => x.uId === this.element.uId);
      this.parentRendererOutlet.parentElement.children.splice(index, 1);
   }
}
