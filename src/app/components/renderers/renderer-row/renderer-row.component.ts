import { Component, Inject, OnInit } from '@angular/core';
import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { renderer } from 'src/app/code-base/decorators/rederer';
import { EL_ROW } from 'src/app/code-base/element-defintions/row';
import { INJ_CHILDREN, INJ_PAGE_ELEMENT, INJ_DROP_LISTS } from 'src/app/code-base/injection-tokens';
import { PageElement } from 'src/app/code-base/page-element';

@Component({
   selector: 'app-renderer-row',
   templateUrl: './renderer-row.component.html',
   styleUrls: ['./renderer-row.component.scss']
})
@renderer(EL_ROW)
export class RendererRowComponent extends BaseRenderer implements OnInit {

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
