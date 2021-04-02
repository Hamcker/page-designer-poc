import { ComponentFactory, ComponentFactoryResolver, ViewContainerRef, Injectable, Inject, Type } from '@angular/core';
import { CONTENT_MAPPINGS } from './constants';
// import { InlineService } from './inline.service';

@Injectable()
export class CreateDynamicComponentService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(CONTENT_MAPPINGS) private contentMappings: any,
    // private inlineService: InlineService
  ) { }


  createComponent(content: any, type: any, vcRef) {
    const componentRef = this.renderComp(content, type, vcRef)
    if (content.child && content.child.length) {
      if (!componentRef.instance.embeddedContainer) {
        const cmpName = componentRef.instance.constructor.name;
        throw new TypeError(`Trying to render embedded content. ${cmpName} must have @ViewChild() embeddedContainer defined`);
      }

       content.child.forEach(type => {
        const typeP = this.contentMappings[type.type];
        this.createComponent(type, typeP, componentRef.instance.embeddedContainer);
      });
    }
    if (content.data) {
      componentRef.instance.data = content.data;
    }
  }

  renderComp(content,type, vcRef: ViewContainerRef) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(type);
    const componentRef = vcRef.createComponent<any>(componentFactory);

    if (componentRef.instance.contentOnCreate) {
      componentRef.instance.contentOnCreate(content);
    }

    return componentRef;
  }
}



