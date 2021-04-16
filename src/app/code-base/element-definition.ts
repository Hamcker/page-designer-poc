import { PropertyPrptotype } from "./property-prototype";

export class ElementDefinition {
   name: string;
   icon: string;
   childrenTypes?: string[] | false;
   parentTypes?: string[] | false;
   properties: PropertyPrptotype[];

   constructor(options?: Partial<ElementDefinition>) {
      Object.assign(this,
         { childrenTypes: false, parentTypes: false },
         options);
   }
}
