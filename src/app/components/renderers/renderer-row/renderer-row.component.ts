import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { renderer } from 'src/app/code-base/decorators/renderer';
import { EL_ROW } from 'src/app/code-base/element-defintions/row';
import { INJ_CHILDREN, INJ_PAGE_ELEMENT, INJ_RENDER_MODE, INJ_DROP_LISTS_OBSERVABLE } from 'src/app/code-base/injection-tokens';
import { PageElement } from 'src/app/code-base/page-element';
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
      @Inject(INJ_PAGE_ELEMENT) public pageElement: PageElement,
      @Inject(INJ_RENDER_MODE) public renderMode: TRenderMode,
      @Inject(INJ_CHILDREN) public children: PageElement[],
      @Inject(INJ_DROP_LISTS_OBSERVABLE) public allDropListsIds: Observable<string[]>,
   ) {
      super(injector);
   }

   ngOnInit(): void {
   }

}
