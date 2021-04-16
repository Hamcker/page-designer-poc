import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { renderer } from 'src/app/code-base/decorators/renderer';
import { EL_ROW } from 'src/app/code-base/element-defintions/row';
import { INJ_PAGE_ELEMENT } from 'src/app/code-base/injection-tokens';
import { ElementInstance } from 'src/app/code-base/element-instance';
import { TRenderMode } from 'src/app/code-base/types';

@Component({
   selector: 'app-renderer-row',
   templateUrl: './renderer-row.component.html',
   styleUrls: ['./renderer-row.component.scss']
})
@renderer(EL_ROW)
export class RendererRowComponent extends BaseRenderer implements OnInit {

   constructor(
      injector: Injector,
      @Inject(INJ_PAGE_ELEMENT) public pageElement: ElementInstance,
   ) {
      super(injector);
   }

   ngOnInit(): void {
   }

}
