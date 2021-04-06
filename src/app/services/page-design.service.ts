import { BehaviorSubject, Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { PageElement } from '../code-base/page-element';
import { TRenderMode } from '../code-base/types';

@Injectable({
   providedIn: 'root'
})
export class PageDesignService {

   layoutChange = new Subject();
   dropListsChange = new BehaviorSubject<string[]>([]);
   renderMode = new BehaviorSubject<TRenderMode>('design');

   constructor() { }

   collectAllDropListsIds(rootElement: PageElement): string[] {
      const dropListsIds = this.getIdsRecursive(rootElement);
      this.dropListsChange.next(dropListsIds);
      return dropListsIds;
   }

   private getIdsRecursive(item: PageElement): string[] {
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
