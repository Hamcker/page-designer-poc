import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Host, Injector, Input, OnInit, Optional, Output, SkipSelf, StaticProvider, TemplateRef, Type, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { INJ_CHILDREN, INJ_DROP_LISTS_OBSERVABLE, INJ_PAGE_ELEMENT, INJ_RENDER_MODE } from 'src/app/code-base/injection-tokens';

import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { PageElement } from 'src/app/code-base/page-element';
import { RendererRepository } from 'src/app/code-base/repositories/renderer-repository';
import { TRenderMode } from 'src/app/code-base/types';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export type Content<T> = string | TemplateRef<T> | Type<T>;



@Component({
   selector: 'renderer-outlet',
   templateUrl: './renderer-outlet.component.html',
   styleUrls: ['./renderer-outlet.component.scss']
})
export class RendererOutletComponent implements OnInit, AfterViewInit {

   #allDropListsIds: string[];
   #rendererComponentRef: ComponentRef<BaseRenderer>;
   #allDropListsIds$ = new BehaviorSubject<string[]>([]);

   isViewAttached = false;

   @Input() element: PageElement;
   @Input() parentElement?: PageElement;
   @Input() renderMode: TRenderMode = 'design';

   @Input() set connectedDropListsIds(ids: string[]) {
      this.#allDropListsIds = ids;
      this.#allDropListsIds$?.next(ids);
   }
   get connectedDropListsIds(): string[] { return this.#allDropListsIds;/*.filter(id => id !== this.element.uId);*/ }

   @Output() layoutChange = new EventEmitter();

   @ViewChild('dummyVcr', { read: ViewContainerRef }) dummyVcr: ViewContainerRef;

   constructor(
      private cfr: ComponentFactoryResolver,
      private cdr: ChangeDetectorRef,
      private viewContainerRef: ViewContainerRef,
      private injector: Injector,
      private changeDetectorRef: ChangeDetectorRef,
      @SkipSelf() @Host() @Optional() private parentRendererOutlet: RendererOutletComponent,
   ) {
   }

   ngOnInit(): void {
   }
   ngAfterViewInit() {
      this.redraw();
      this.changeDetectorRef.detectChanges();
   }

   private redraw() {
      const componentType = RendererRepository.get(this.element.definition.name).componentType;

      const rendererFactory = this.cfr.resolveComponentFactory<BaseRenderer>(componentType);
      const injector = this.getInjector();

      // create component
      this.#rendererComponentRef = rendererFactory.create(injector);

      // handle component's view init just before adding it to view
      this.#rendererComponentRef.instance.lifecycleEvents.pipe(filter(x => x === 'AfterViewInit')).subscribe(_ => {
         this.viewContainerRef.createEmbeddedView(this.element.templateRefs[this.renderMode]);
         this.cdr.detectChanges();
      })

      // insert to dummy ViewContainerRef first to trigger ngAfterInit and *renderer-body
      this.dummyVcr.insert(this.#rendererComponentRef.hostView);
   }


   private getInjector(): Injector {

      const options: {
         providers: StaticProvider[];
         parent?: Injector;
         name?: string;
      } = {
         parent: this.injector,
         providers: [
            { provide: INJ_PAGE_ELEMENT, useValue: this.element },
            { provide: INJ_CHILDREN, useValue: this.element.children },
            { provide: INJ_DROP_LISTS_OBSERVABLE, useValue: this.#allDropListsIds$ },
            { provide: INJ_RENDER_MODE, useValue: this.renderMode },
         ]
      }

      return Injector.create(options);
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
