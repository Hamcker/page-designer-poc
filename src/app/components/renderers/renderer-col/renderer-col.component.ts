import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { renderer } from 'src/app/code-base/decorators/renderer';
import { EL_COL } from 'src/app/code-base/element-defintions/col';
import { INJ_CHILDREN, INJ_DROP_LISTS_OBSERVABLE, INJ_PAGE_ELEMENT, INJ_RENDER_MODE } from 'src/app/code-base/injection-tokens';
import { PageElement } from 'src/app/code-base/page-element';
import { TRenderMode } from 'src/app/code-base/types';

@Component({
   selector: 'app-renderer-col',
   templateUrl: './renderer-col.component.html',
   styleUrls: ['./renderer-col.component.scss']
})
@renderer(EL_COL)
export class RendererColComponent extends BaseRenderer implements OnInit {

   constructor(
      injector: Injector,
      @Inject(INJ_RENDER_MODE) public renderMode: TRenderMode,
      @Inject(INJ_CHILDREN) public children: PageElement[],
      @Inject(INJ_DROP_LISTS_OBSERVABLE) public allDropListsIds: Observable<string[]>,
   ) {
      super(injector);
   }

   ngOnInit(): void {
   }

}
