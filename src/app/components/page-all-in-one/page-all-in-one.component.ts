import { AfterViewInit, Component, OnInit } from '@angular/core';

import { PageDesignService } from 'src/app/services/page-design.service';
import { take } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
   selector: 'app-page-all-in-one',
   templateUrl: './page-all-in-one.component.html',
   styleUrls: ['./page-all-in-one.component.scss']
})
export class PageAllInOneComponent implements OnInit, AfterViewInit {

   layoutJson: string;
   dataContext: string;

   showEditors = false;

   editors = {
      generatedLayout: {
         options: {
            language: 'json',
            tabSize: 2,
         },
         ref: null,
      },
      dataContext: {
         options: {
            language: 'json',
            tabSize: 2,
         },
         ref: null,
      },
      viewContext: {
         options: {
            language: 'json',
            tabSize: 2,
         },
         ref: null,
      },
   }

   constructor(
      private pageDesignerService: PageDesignService,
   ) { }

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

   onLayoutJsonChange(json: string) {
      this.layoutJson = json;
      timer(50).pipe(take(1)).subscribe(_ => this.editors.generatedLayout.ref.getAction('editor.action.formatDocument').run());
   }

   onDataContextChange(json: string) {
      const dataContext = JSON.parse(json);
      this.pageDesignerService.dataContext.next(dataContext);
   }
}
