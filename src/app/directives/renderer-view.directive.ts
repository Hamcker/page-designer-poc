import { Directive, Input, OnInit, TemplateRef } from '@angular/core';

import { RendererOutletComponent } from '../components/renderer-outlet/renderer-outlet.component';
import { TRenderMode } from '../code-base/types';

@Directive({
   selector: '[RendererView],[renderer-view]'
})
export class RendererViewDirective implements OnInit {

   @Input('renderer-view') rendererView: TRenderMode;

   constructor(
      private templateRef: TemplateRef<any>,
      private parentRendererOutlet: RendererOutletComponent,
   ) {
   }

   ngOnInit() {
      this.parentRendererOutlet.pageElement.templateRefs ??= {};
      this.parentRendererOutlet.pageElement.templateRefs[this.rendererView] = this.templateRef;
   }
}
