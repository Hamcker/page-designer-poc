import { ElementDefinition } from "../element-definition";
import { PROP_ID } from "./frequent-properties";
import { PropertyPrptotype } from "../property-prototype";

export const EL_INPUT: ElementDefinition = new ElementDefinition({
   name: 'Input',
   icon: 'las la-circle',
   parentTypes: ['Col'],
   properties: [
      PROP_ID,
      new PropertyPrptotype({
         name: 'value',
         editor: 'textbox',
         type: 'string'
      }),
   ]
});
