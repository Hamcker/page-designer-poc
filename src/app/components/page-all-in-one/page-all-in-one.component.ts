import { AfterViewInit, Component, OnInit } from '@angular/core';

import { take } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
   selector: 'app-page-all-in-one',
   templateUrl: './page-all-in-one.component.html',
   styleUrls: ['./page-all-in-one.component.scss']
})
export class PageAllInOneComponent implements OnInit, AfterViewInit {

   showEditors = false;

   editors = {
      generatedLayout: {
         options: {},
         ref: null,
      },
      dataContext: {
         options: {},
         ref: null,
      },
      viewContext: {
         options: {},
         ref: null,
      },
   }

   constructor() { }

   ngOnInit(): void {
      timer(500).pipe(take(1)).subscribe(_ => {
         this.showEditors = true
         // Object.keys(this.editors).map(x => this.editors[x]).forEach(x => x.ref.layout());
      });
   }

   ngAfterViewInit() {

   }

   setEditor(name: string, ref: any) {
      this.editors[name].ref = ref;
      // ref.layout();
   }


}
