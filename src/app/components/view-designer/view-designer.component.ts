import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PageDesignService } from 'src/app/services/page-design.service';

@Component({
   selector: 'app-view-designer',
   templateUrl: './view-designer.component.html',
   styleUrls: ['./view-designer.component.scss']
})
export class ViewDesignerComponent implements OnInit {

   allDropListsIds: string[];
   layoutJson: string;
   isDesignMode = true;

   @Output() layoutJsonChange = new EventEmitter<string>();
   @Output() dataContextChange = new EventEmitter<{}>();

   constructor(
      private pageDesignService: PageDesignService,
   ) { }

   ngOnInit(): void {
   }

   onLayoutJsonChange(json: string) {
      this.layoutJsonChange.emit(json);
   }

   onDesignModeChange($event) {
      this.pageDesignService.renderMode.next($event ? 'design' : 'run');
   }
}
