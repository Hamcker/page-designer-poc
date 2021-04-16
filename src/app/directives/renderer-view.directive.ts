import { Directive, Input, OnInit, TemplateRef } from '@angular/core';

import { RendererOutletComponent } from '../components/renderer-outlet/renderer-outlet.component';
import { RendererViewContext } from '../code-base/renderer-view-context';
import { TRenderMode } from '../code-base/types';

@Directive({
   selector: '[RendererView],[renderer-view]'
})
export class RendererViewDirective<T> implements OnInit {

   @Input('renderer-view') rendererView: TRenderMode;

   constructor(
      private templateRef: TemplateRef<RendererViewContext<T>>,
      private parentRendererOutlet: RendererOutletComponent,
   ) {
   }

   ngOnInit() {
      this.parentRendererOutlet.pageElement.templateRefs ??= {};
      this.parentRendererOutlet.pageElement.templateRefs[this.rendererView] = this.templateRef;

   }

   static ngTemplateGuard_rendererView<T>(dir: RendererViewDirective<T>, expr: TRenderMode): expr is TRenderMode {
      return true;
   };

   static ngTemplateContextGuard<T>(dir: RendererViewDirective<T>, ctx: any):
      ctx is RendererViewContext<T> {
      return true;
   }
}
