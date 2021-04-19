import { BehaviorSubject, Subject } from 'rxjs';

import { ElementInstance } from '../code-base/element-instance';
import { Injectable } from '@angular/core';
import { TRenderMode } from '../code-base/types';
import { filter } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class PageDesignService {

   layoutChange = new Subject();
   dropListsChange = new BehaviorSubject<string[]>([]);

   renderMode = new BehaviorSubject<TRenderMode>('design');
   itemSelect = new BehaviorSubject<ElementInstance>(null);
   dataContext = new BehaviorSubject<any>(null);
   dataContextChange = new Subject();
   viewContext = new Subject();

   constructor() {
      this.dataContextChange.subscribe(x => {
         this.dataContext.next(this.dataContext.value);
      })
   }

   collectAllDropListsIds(rootElement: ElementInstance): string[] {
      const dropListsIds = this.getIdsRecursive(rootElement);
      this.dropListsChange.next(dropListsIds);
      return dropListsIds;
   }

   getSelectedItem() {
      return this.itemSelect.pipe(filter(x => !!x));
   }


   private getIdsRecursive(item: ElementInstance): string[] {
      let ids = [item.uId];
      item.children.forEach(childItem => { ids = ids.concat(this.getIdsRecursive(childItem)) });

      const sortedIds = ids
         .sort((a, b) => {
            const aDashes = a.split('-').length;
            const bDashes = b.split('-').length;

            if (aDashes > bDashes) return -1;
            if (aDashes < bDashes) return 1;

            return 0;
         });

      return sortedIds;
   }
}
