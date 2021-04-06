import { Component, Inject, Injector, OnInit } from '@angular/core';

import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { EL_COL } from 'src/app/code-base/element-defintions/col';
import { INJ_PAGE_ELEMENT } from 'src/app/code-base/injection-tokens';
import { Observable } from 'rxjs';
import { PageElement } from 'src/app/code-base/page-element';
import { TRenderMode } from 'src/app/code-base/types';
import { renderer } from 'src/app/code-base/decorators/renderer';

@Component({
   selector: 'app-renderer-col',
   templateUrl: './renderer-col.component.html',
   styleUrls: ['./renderer-col.component.scss']
})
@renderer(EL_COL)
export class RendererColComponent extends BaseRenderer implements OnInit {

   constructor(
      injector: Injector,
   ) {
      super(injector);
   }

   ngOnInit(): void {
   }

}
