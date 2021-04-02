import { Component, Inject, OnInit } from '@angular/core';

import { EL_BODY } from 'src/app/code-base/element-defintions/body';
import { renderer } from 'src/app/code-base/decorators/rederer';
import { PageElement } from 'src/app/code-base/page-element';
import { INJ_CHILDREN, INJ_DROP_LISTS, INJ_PAGE_ELEMENT } from 'src/app/code-base/injection-tokens';
import { BaseRenderer } from 'src/app/code-base/base-renderer';

@Component({
   selector: 'app-renderer-body',
   templateUrl: './renderer-body.component.html',
   styleUrls: ['./renderer-body.component.scss']
})
@renderer(EL_BODY)
export class RendererBodyComponent extends BaseRenderer implements OnInit {

   constructor(
      @Inject(INJ_CHILDREN) public children: PageElement[],
      @Inject(INJ_PAGE_ELEMENT) public element: PageElement,
      @Inject(INJ_DROP_LISTS) public connectedDropListsIds: string[],
   ) {
      super();
   }

   ngOnInit(): void {
   }



}
