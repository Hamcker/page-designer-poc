import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { BaseRenderer } from '../code-base/base-renderer';
import { RendererOutletComponent } from '../components/renderer-outlet/renderer-outlet.component';

@Pipe({
   name: 'prop'
})
export class PropertyPipe implements PipeTransform {

   asyncPipe = new AsyncPipe(this.cdr);

   constructor(
      private renderer: BaseRenderer,
      private cdr: ChangeDetectorRef,
   ) { }

   transform(key: string): any {
      const observable = this.renderer.get(key);
      return this.asyncPipe.transform(observable);
   }

}
