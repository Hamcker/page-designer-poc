import { Component, Host, HostBinding, Inject, Input, OnInit } from '@angular/core';

import { INJ_PAGE_ELEMENT } from 'src/app/code-base/injection-tokens';
import { PageElement } from 'src/app/code-base/page-element';
import { RendererOutletComponent } from '../renderer-outlet/renderer-outlet.component';
import { TRenderMode } from 'src/app/code-base/types';
import { PageDesignService } from 'src/app/services/page-design.service';

@Component({
   selector: 'renderer-drag-handler',
   templateUrl: './renderer-drag-handler.component.html',
   styleUrls: ['./renderer-drag-handler.component.scss']
})
export class RendererDragHandlerComponent implements OnInit {

   @Input() dragDisabled: boolean;
   @Input('position') position: 'inside' | 'outside';

   @HostBinding('class.hidden') hidden: boolean = false;
   @HostBinding('class.inside') get isPositionInside(): boolean { return this.position === 'inside'; }
   @HostBinding('class.outside') get isPositionOutside(): boolean { return this.position === 'outside'; }

   constructor(
      @Inject(INJ_PAGE_ELEMENT) public pageElement: PageElement,
      private pageDesignService: PageDesignService,
   ) {
      this.pageDesignService.renderMode.subscribe(x => this.hidden = x === 'run');
      this.dragDisabled ??= !this.pageElement.parent;
   }

   ngOnInit(): void {
   }


   onRemoveClick() {
      const index = this.pageElement.children.findIndex(x => x.uId === this.pageElement.uId);
      this.pageElement.children.splice(index, 1);
      this.pageDesignService.layoutChange.next();
      this.pageDesignService.layoutChange.next();
   }
}
