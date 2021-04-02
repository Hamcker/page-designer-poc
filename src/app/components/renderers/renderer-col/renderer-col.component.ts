import { Component, Inject, OnInit } from '@angular/core';
import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { renderer } from 'src/app/code-base/decorators/rederer';
import { EL_COL } from 'src/app/code-base/element-defintions/col';
import { INJ_CHILDREN, INJ_PAGE_ELEMENT, INJ_DROP_LISTS } from 'src/app/code-base/injection-tokens';
import { PageElement } from 'src/app/code-base/page-element';

@Component({
   selector: 'app-renderer-col',
   templateUrl: './renderer-col.component.html',
   styleUrls: ['./renderer-col.component.scss']
})
@renderer(EL_COL)
export class RendererColComponent extends BaseRenderer implements OnInit {

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
