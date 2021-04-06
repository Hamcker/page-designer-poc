import { Component, ComponentFactoryResolver, Inject, Injector, Input, OnInit, Optional, ViewContainerRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { INJ_PAGE_ELEMENT } from 'src/app/code-base/injection-tokens';
import { PageElement } from 'src/app/code-base/page-element';
import { DropZoneDirective } from 'src/app/directives/drop-zone.directive';
import { RendererOutletComponent } from '../renderer-outlet/renderer-outlet.component';

@Component({
   selector: 'renderer-children',
   templateUrl: './renderer-children.component.html',
   styleUrls: ['./renderer-children.component.scss']
})
export class RendererChildrenComponent implements OnInit {

   @Input() slot: string = 'default';

   constructor(
      @Inject(INJ_PAGE_ELEMENT) private pageElement: PageElement,
      private vcr: ViewContainerRef,
      private cfr: ComponentFactoryResolver,
      private injector: Injector,
      private parentRendererOutlet: RendererOutletComponent,
      @Optional() parentDropZone: DropZoneDirective,
   ) {
      this.slot ??= parentDropZone?.slot;
   }

   ngOnInit(): void {
      this.parentRendererOutlet.logicalTreeChange
         // .pipe(filter(x => x.slot === this.slot))
         .subscribe(_ => {
            this.renderChildren();
         })
   }

   renderChildren() {
      this.vcr.clear();
      this.pageElement.children.forEach((child, index) => {
         const childComponentFactory = this.cfr.resolveComponentFactory(RendererOutletComponent);

         const componentRef = childComponentFactory.create(this.injector);
         // const componentRef = this.vcr.createComponent(childComponentFactory, index);

         // initialize
         componentRef.instance.pageElement = child;

         // add to view
         this.vcr.insert(componentRef.hostView, index);
      })

   }

}
