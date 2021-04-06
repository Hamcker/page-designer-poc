import { Guid } from "guid-typescript";
import { TemplateRef } from "@angular/core";
import { ToolboxElement } from "./toolbox-element";

export class PageElement {
   uId: string;
   definition: ToolboxElement;
   properties?: { [i: string]: any };
   children?: PageElement[];
   templateRefs?: { [i: string]: TemplateRef<any> };

   constructor(parentElement: PageElement, definition: ToolboxElement, ...children: PageElement[]) {
      if (!parentElement) {
         this.uId = 'pd-root'
      } else {
         this.uId = parentElement.uId + '-' + parentElement.children.length;
      }
      this.definition = definition;
      this.children = children ?? [];
   }
}

export class SerializedRealElement {
   type: string;
   properties?: { [i: string]: any };
   children?: SerializedRealElement[];
}
