import { TemplateRef } from "@angular/core";
import { ToolboxElement } from "./toolbox-element";

export class PageElement {
   uId: string;

   definition: ToolboxElement;
   parent?: PageElement;
   children?: PageElement[];

   templateRefs?: { [i: string]: TemplateRef<any> };

   properties?: { [i: string]: any };
   slot?: string;

   constructor(parentElement: PageElement, definition: ToolboxElement, ...children: PageElement[]) {
      if (!parentElement) {
         this.uId = 'root'
      } else {
         this.uId = `${parentElement.uId}.${definition.name}-${parentElement.children.length}`;
      }
      this.definition = definition;
      this.parent = parentElement;
      this.children = children ?? [];
   }


}

export class SerializedRealElement {
   type: string;
   properties?: { [i: string]: any };
   children?: SerializedRealElement[];
}
