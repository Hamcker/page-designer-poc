import { Component, Inject, OnInit } from '@angular/core';
import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { renderer } from 'src/app/code-base/decorators/rederer';
import { EL_BUTTON } from 'src/app/code-base/element-defintions/button';
import { INJ_CHILDREN, INJ_PAGE_ELEMENT, INJ_DROP_LISTS } from 'src/app/code-base/injection-tokens';
import { PageElement } from 'src/app/code-base/page-element';

@Component({
   selector: 'app-renderer-button',
   templateUrl: './renderer-button.component.html',
   styleUrls: ['./renderer-button.component.scss']
})
@renderer(EL_BUTTON)
export class RendererButtonComponent extends BaseRenderer implements OnInit {

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
