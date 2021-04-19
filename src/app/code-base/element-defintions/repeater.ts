import { ElementDefinition } from "../element-definition";
import { PROP_ID } from "./frequent-properties";
import { PropertyPrptotype } from "../property-prototype";

export const EL_Repeater: ElementDefinition = new ElementDefinition({
   name: 'Repeater',
   icon: 'las la-redo-alt',
   parentTypes: ['Body', 'Col'],
   childrenTypes: ['Input'],
   // maxChildren: 1,
   properties: [
      PROP_ID,
      new PropertyPrptotype({
         name: 'items',
         editor: 'textbox',
         type: 'string'
      }),
   ]
});

