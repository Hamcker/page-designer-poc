import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-view-designer',
   templateUrl: './view-designer.component.html',
   styleUrls: ['./view-designer.component.scss']
})
export class ViewDesignerComponent implements OnInit {

   allDropListsIds: string[];

   constructor() { }

   ngOnInit(): void {
   }

}
