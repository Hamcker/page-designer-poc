import { CDK_DROP_LIST } from '@angular/cdk/drag-drop';
import { Component, ComponentFactoryResolver, Inject, Injector, Input, OnInit, Optional, ViewContainerRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { INJ_PAGE_ELEMENT } from 'src/app/code-base/injection-tokens';
import { ElementInstance } from 'src/app/code-base/element-instance';
import { DropZoneDirective } from 'src/app/directives/drop-zone.directive';
import { RendererOutletComponent } from '../renderer-outlet/renderer-outlet.component';
import { PROP_DATACONTEXT } from 'src/app/code-base/element-defintions/frequent-properties';
import { EL_BUTTON } from 'src/app/code-base/element-defintions/button';
import { EL_INPUT } from 'src/app/code-base/element-defintions/input';

@Component({
   selector: 'renderer-children',
   templateUrl: './renderer-children.component.html',
   styleUrls: ['./renderer-children.component.scss']
})
export class RendererChildrenComponent implements OnInit {

   @Input() slot: string = 'default';

   #asTemplatefor: any[];
   @Input() set asTemplateFor(value: any[]) {
      this.#asTemplatefor = value;
      this.renderChildren();
   }
   get asTemplateFor(): any[] {
      return this.#asTemplatefor;
   }

   constructor(
      @Inject(INJ_PAGE_ELEMENT) private pageElement: ElementInstance,
      private vcr: ViewContainerRef,
      private cfr: ComponentFactoryResolver,
      private injector: Injector,
      private parentRendererOutlet: RendererOutletComponent,
      @Optional() private parentDropZone: DropZoneDirective,
   ) {
      this.slot ??= parentDropZone?.slot;
   }

   ngOnInit(): void {
      this.parentRendererOutlet.logicalTreeChange
         // .pipe(filter(x => x.slot === this.slot))
         .subscribe(_ => {
            this.renderChildren();
         });

      this.renderChildren();
   }

   renderChildren() {
      this.vcr.clear();

      if (!!this.asTemplateFor && this.pageElement?.children?.length > 0) {
         this.asTemplateFor.forEach((itemContext, index) => {
            const childComponentFactory = this.cfr.resolveComponentFactory(RendererOutletComponent);

            const componentRef = childComponentFactory.create(this.getChildrenInjector());
            // const componentRef = this.vcr.createComponent(childComponentFactory, index);

            // initialize
            componentRef.instance.pageElement = ElementInstance.cloneFrom(this.pageElement.children[0]);
            // componentRef.instance.pageElement = new ElementInstance(this.pageElement, EL_INPUT);
            componentRef.instance.itemContext = itemContext;

            // add to view
            this.vcr.insert(componentRef.hostView, index);
         });

      } else {
         this.pageElement.children.forEach((child, index) => {
            const childComponentFactory = this.cfr.resolveComponentFactory(RendererOutletComponent);

            const componentRef = childComponentFactory.create(this.getChildrenInjector());

            // initialize
            componentRef.instance.pageElement = child;

            // add to view
            this.vcr.insert(componentRef.hostView, index);
         });
      }
   }

   private getChildrenInjector() {
      return Injector.create({
         name: 'Renderer Children Injector',
         parent: this.injector,
         providers: [
            { provide: CDK_DROP_LIST, useValue: this.parentDropZone },
         ]
      })
   }

}
