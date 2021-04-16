import { ElementDefinition } from "../element-definition";
import { PROP_DATACONTEXT } from "./frequent-properties";
import { PropertyPrptotype } from "../property-prototype";

export const EL_COL: ElementDefinition = new ElementDefinition({
   name: 'Col',
   icon: 'las la-grip-lines-vertical',
   parentTypes: ['Row'],
   childrenTypes: ['Row', 'Button', 'Input'],
   properties: [
      PROP_DATACONTEXT,
      new PropertyPrptotype({
         name: 'width',
         editor: 'textbox',
         type: 'number'
      })
   ]
});
