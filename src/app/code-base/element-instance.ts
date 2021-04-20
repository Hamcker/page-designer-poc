import { Binding, TBindingSource } from "./binding";

import { ElementDefinition } from "./element-definition";
import { PropertyDesign } from "./property-design";
import { TemplateRef } from "@angular/core";
import { Guid } from "guid-typescript";

export class ElementInstance {
   uId: string;

   definition: ElementDefinition;
   parent?: ElementInstance;
   children?: ElementInstance[];

   templateRefs?: { [i: string]: TemplateRef<any> };

   properties?: PropertyDesign[] = [];
   slot?: string;

   constructor(parentElement?: ElementInstance, definition?: ElementDefinition, ...children: ElementInstance[]) {
      const guid = (Guid.create().toString()).split('-')[1];
      if (!parentElement) {
         this.uId = 'root'
      } else {
         this.uId = `${parentElement.uId}.${definition?.name}-${parentElement.children.length}(${guid})`;
      }
      this.definition = definition;
      this.parent = parentElement;
      this.children = children ?? [];

      definition?.properties?.forEach(dp => {
         this.properties.push(new PropertyDesign({ definition: dp }));
      });
   }

   addBinding(key: string, binding: Binding) {
      const property = this.properties?.find(x => x.definition.name === key);
      property.valueType = 'dynamic';
      property.value = binding;
   }
   bindProperty(key: string, bindingSource: TBindingSource, path: string) {
      const property = this.properties?.find(x => x.definition.name === key);
      property.valueType = 'dynamic';
      property.value = new Binding({ source: bindingSource, path });
   }

   setStatic(key: string, value: any): void {
      const property = this.properties?.find(x => x.definition.name === key);
      property.valueType = 'static';
      property.value = value;
   }

   property(key: string): PropertyDesign {
      return this.properties?.find(x => x.definition.name === key);
   }

   static cloneFrom(source: ElementInstance) {
      const outlet = new ElementInstance();
      const guid = (Guid.create().toString()).split('-')[1];

      Object.assign(outlet, source);

      if (!source.parent) {
         outlet.uId = 'root'
      } else {
         outlet.uId = `${source.parent.uId}.${source.definition.name}-${source.parent.children.length}(${guid})`;
      }

      delete outlet.templateRefs;

      return outlet;
   }
}

export class SerializedRealElement {
   type: string;
   properties?: { [i: string]: any };
   children?: SerializedRealElement[];
}
