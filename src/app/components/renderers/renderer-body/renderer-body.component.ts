import { Component, Inject, Injector, OnInit, TemplateRef } from '@angular/core';

import { EL_BODY } from 'src/app/code-base/element-defintions/body';
import { renderer } from 'src/app/code-base/decorators/renderer';
import { PageElement } from 'src/app/code-base/page-element';
import { INJ_CHILDREN, INJ_DROP_LISTS_OBSERVABLE, INJ_PAGE_ELEMENT, INJ_RENDER_MODE } from 'src/app/code-base/injection-tokens';
import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { TRenderMode } from 'src/app/code-base/types';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-renderer-body',
   templateUrl: './renderer-body.component.html',
   styleUrls: ['./renderer-body.component.scss']
})
@renderer(EL_BODY)
export class RendererBodyComponent extends BaseRenderer implements OnInit {

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
