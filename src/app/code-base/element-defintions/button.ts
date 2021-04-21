import { ElementDefinition } from "../element-definition";
import { PROP_DATACONTEXT } from "./frequent-properties";
import { PropertyBindingType } from "@angular/compiler";
import { PropertyPrptotype } from "../property-prototype";

export const EL_BUTTON: ElementDefinition = new ElementDefinition({
   name: 'Button',
   icon: 'las la-square',
   parentTypes: ['Col'],
   properties: [
      PROP_DATACONTEXT,
      new PropertyPrptotype({
         name: 'caption',
         editor: 'textbox',
         type: 'string',
         canBound: true,
         defaultValue: 'Button'
      })
   ]
});
