import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
   selector: 'app-view-designer',
   templateUrl: './view-designer.component.html',
   styleUrls: ['./view-designer.component.scss']
})
export class ViewDesignerComponent implements OnInit {

   allDropListsIds: string[];
   layoutJson: string;

   @Output() layoutJsonChange = new EventEmitter<string>();

   constructor() { }

   ngOnInit(): void {
   }

   onLayoutJsonChange(json: string) {
      this.layoutJsonChange.emit(json);
   }
}
