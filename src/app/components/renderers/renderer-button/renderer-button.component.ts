import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { renderer } from 'src/app/code-base/decorators/renderer';
import { EL_BUTTON } from 'src/app/code-base/element-defintions/button';
import { INJ_PAGE_ELEMENT } from 'src/app/code-base/injection-tokens';
import { ElementInstance } from 'src/app/code-base/element-instance';
import { TRenderMode } from 'src/app/code-base/types';

@Component({
   selector: 'app-renderer-button',
   templateUrl: './renderer-button.component.html',
   styleUrls: ['./renderer-button.component.scss']
})
@renderer(EL_BUTTON)
export class RendererButtonComponent extends BaseRenderer implements OnInit {

   constructor(
      injector: Injector,
      @Inject(INJ_PAGE_ELEMENT) public pageElement: ElementInstance,
   ) {
      super(injector);
   }

   ngOnInit(): void {
   }

}
