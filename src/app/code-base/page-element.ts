import { Guid } from "guid-typescript";
import { ToolboxElement } from "./toolbox-element";

export class PageElement {
   uId: string;
   definition: ToolboxElement;
   properties?: { [i: string]: any };
   children?: PageElement[];

   constructor(definition: ToolboxElement, ...children: PageElement[]) {
      this.uId = Guid.create().toString();
      this.definition = definition;
      this.children = children ?? [];
   }
}

export class SerializedRealElement {
   type: string;
   properties?: { [i: string]: any };
   children?: SerializedRealElement[];
}
