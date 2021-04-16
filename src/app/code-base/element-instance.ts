import { ElementDefinition } from "./element-definition";
import { PropertyDesign } from "./property-design";
import { TemplateRef } from "@angular/core";

export class ElementInstance {
   uId: string;

   definition: ElementDefinition;
   parent?: ElementInstance;
   children?: ElementInstance[];

   templateRefs?: { [i: string]: TemplateRef<any> };

   properties?: PropertyDesign[] = [];
   slot?: string;

   constructor(parentElement: ElementInstance, definition: ElementDefinition, ...children: ElementInstance[]) {
      if (!parentElement) {
         this.uId = 'root'
      } else {
         this.uId = `${parentElement.uId}.${definition.name}-${parentElement.children.length}`;
      }
      this.definition = definition;
      this.parent = parentElement;
      this.children = children ?? [];

      definition.properties?.forEach(dp => {
         this.properties.push(new PropertyDesign({ definition: dp }));
      });
   }

   // get(key: string): any {
   //    const property = this.properties.find(x => x.definition.name === key);

   // }
}

export class SerializedRealElement {
   type: string;
   properties?: { [i: string]: any };
   children?: SerializedRealElement[];
}
