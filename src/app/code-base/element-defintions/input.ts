import { ElementDefinition } from "../element-definition";
import { PROP_DATACONTEXT, PROP_ID } from "./frequent-properties";
import { PropertyPrptotype } from "../property-prototype";

export const EL_INPUT: ElementDefinition = new ElementDefinition({
   name: 'Input',
   icon: 'las la-circle',
   parentTypes: ['Col', 'Repeater'],
   properties: [
      PROP_ID,
      PROP_DATACONTEXT,
      new PropertyPrptotype({
         name: 'value',
         editor: 'textbox',
         type: 'string'
      }),
      new PropertyPrptotype({
         name: 'placeholder',
         editor: 'textbox',
         type: 'string'
      }),
   ]
});
