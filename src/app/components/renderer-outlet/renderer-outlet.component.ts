import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Host, Injector, Input, OnInit, Optional, Output, QueryList, SkipSelf, StaticProvider, TemplateRef, Type, ViewChild, ViewChildren, ViewContainerRef, ViewRef } from '@angular/core';

import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { BehaviorSubject, Subject } from 'rxjs';
import { INJ_ITEM_CONTEXT, INJ_PAGE_ELEMENT } from 'src/app/code-base/injection-tokens';
import { PageDesignService } from 'src/app/services/page-design.service';
import { ElementInstance } from 'src/app/code-base/element-instance';
import { RendererRepository } from 'src/app/code-base/repositories/renderer-repository';
import { TRenderMode } from 'src/app/code-base/types';
import { filter } from 'rxjs/operators';
import { ElementsAreaComponent } from '../elements-area/elements-area.component';
import { DropZoneDirective } from 'src/app/directives/drop-zone.directive';
import { RendererChildrenComponent } from '../renderer-children/renderer-children.component';
import { PROP_DATACONTEXT } from 'src/app/code-base/element-defintions/frequent-properties';
import { deepFindValue } from 'src/app/code-base/deep-find';

export type Content<T> = string | TemplateRef<T> | Type<T>;

export interface ILogicalTreeChange {
   parent: ElementInstance;
   child: ElementInstance;
   slot: string
}

@Component({
   selector: 'renderer-outlet',
   templateUrl: './renderer-outlet.component.html',
   styleUrls: ['./renderer-outlet.component.scss']
})
export class RendererOutletComponent implements OnInit, AfterViewInit {

   isViewAttached = false;

   /**
    * It's called:
    * 1. from drop-zone.directive when new child is added
    * 2. from renderer-drag-handler when an element is removed
    */
   logicalTreeChange = new EventEmitter<ILogicalTreeChange>(true);

   rendererComponentRef: ComponentRef<BaseRenderer>;

   @Input() pageElement: ElementInstance;
   @Input() itemContext: any;

   @ViewChild('dummyVcr', { read: ViewContainerRef }) dummyVcr: ViewContainerRef;
   @ViewChildren(RendererChildrenComponent) childrenRenderers: QueryList<RendererChildrenComponent>;

   constructor(
      private cfr: ComponentFactoryResolver,
      private cdr: ChangeDetectorRef,
      private mainVcr: ViewContainerRef,
      private injector: Injector,
      private parentElementsArea: ElementsAreaComponent,
      private pageDesignService: PageDesignService,
      @SkipSelf() @Host() @Optional() private parentRendererOutlet: RendererOutletComponent,
   ) {
   }

   ngOnInit(): void {
      this.pageDesignService.layoutChange
         .pipe(filter(_ => !this.pageElement.parent)) // ensure it's root renderer
         .subscribe(_ => {
            this.pageDesignService.collectAllDropListsIds(this.pageElement);
         });
   }
   ngAfterViewInit() {
      // we do it here becuase dummyVcr exists now (can't be done in ngOnInit())
      this.pageDesignService.renderMode.subscribe(renderMode => this.redraw(renderMode));
      this.logicalTreeChange.next();

      this.logicalTreeChange.subscribe(_ => {
         this.rendererComponentRef.instance.logicalTreeChange.next();
      });
   }






   private redraw(renderMode: TRenderMode) {
      const componentType = RendererRepository.get(this.pageElement.definition.name).componentType;

      const rendererFactory = this.cfr.resolveComponentFactory<BaseRenderer>(componentType);
      const injector = this.getInjector();

      // create component
      this.rendererComponentRef = rendererFactory.create(injector);

      this.rendererComponentRef.instance.itemContext = this.itemContext;

      // handle component's view init just before adding it to view
      this.rendererComponentRef.instance.lifecycleEvents.pipe(filter(x => x === 'AfterViewInit')).subscribe(_ => {
         this.mainVcr.clear();
         this.mainVcr.createEmbeddedView(this.pageElement.templateRefs[renderMode]);
         this.cdr.detectChanges();
      })

      // insert to dummy ViewContainerRef first to trigger ngAfterInit and *renderer-body
      this.dummyVcr.insert(this.rendererComponentRef.hostView);

      // trigger change detection (since it's called from ngAfterViewInit())
      this.cdr.detectChanges();
   }


   private getInjector(): Injector {
      const options: {
         providers: StaticProvider[];
         parent?: Injector;
         name?: string;
      } = {
         parent: this.injector,
         providers: [
            { provide: INJ_PAGE_ELEMENT, useValue: this.pageElement },
            { provide: ElementInstance, useValue: this.pageElement },
         ]
      }

      return Injector.create(options);
   }

   private getIdsRecursive(item: ElementInstance): string[] {
      let ids = [item.uId];
      item.children.forEach(childItem => { ids = ids.concat(this.getIdsRecursive(childItem)) });
      return ids;
   }

}

// To Render content of type TemplateRef
// const content = this.resolveNgContent(this.children);
// const componentRef = rendererFactory.create(this.injector, content);

// private resolveNgContent<T>(content: Content<T>): any[][] {
//    if (typeof content === 'string') {
//       const element = this.document.createTextNode(content);
//       return [[element]];
//    }
//    if (content instanceof TemplateRef) {
//       const viewRef = content.createEmbeddedView(null);
//       console.log(viewRef)
//       // In earlier versions, you may need to add this line
//       // this.appRef.attachView(viewRef);
//       return [viewRef.rootNodes];
//    }
//    const factory = this.cfr.resolveComponentFactory(content);
//    const componentRef = factory.create(this.injector);
//    return [[componentRef.location.nativeElement], [this.document.createTextNode('Second ng-content')]];
// }
