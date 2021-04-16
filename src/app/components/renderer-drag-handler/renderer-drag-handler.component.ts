import { Component, Host, HostBinding, HostListener, Inject, Input, OnInit } from '@angular/core';

import { INJ_PAGE_ELEMENT } from 'src/app/code-base/injection-tokens';
import { ElementInstance } from 'src/app/code-base/element-instance';
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
   @HostBinding('class.selected') selected: boolean;

   constructor(
      @Inject(INJ_PAGE_ELEMENT) public pageElement: ElementInstance,
      private pageDesignService: PageDesignService,
   ) {
      this.pageDesignService.renderMode.subscribe(x => this.hidden = x === 'run');
      this.dragDisabled ??= !this.pageElement.parent;
   }

   ngOnInit(): void {
      this.pageDesignService.getSelectedItem().subscribe(x => {
         this.selected = this.pageElement.uId === x.uId;
      });
   }

   @HostListener('click')
   onHostClick() {
      this.pageDesignService.itemSelect.next(this.pageElement);
   }

   onRemoveClick() {
      const index = this.pageElement.children.findIndex(x => x.uId === this.pageElement.uId);
      this.pageElement.children.splice(index, 1);
      this.pageDesignService.layoutChange.next();
      this.pageDesignService.layoutChange.next();
   }
}
