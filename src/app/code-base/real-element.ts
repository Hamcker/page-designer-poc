import { Element } from "./element-defintions/element";
import { Guid } from "guid-typescript";

export class RealElement {
   uId: string;
   definition: Element;
   properties?: { [i: string]: any };
   children?: RealElement[];

   constructor(definition: Element, ...children: RealElement[]) {
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
