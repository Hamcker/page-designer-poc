import { PropertyPrptotype } from "../property-prototype";

export const PROP_ID = new PropertyPrptotype({
   name: 'id',
   editor: 'textbox',
   type: 'string',
   canBound: false
});

export const PROP_DATACONTEXT = new PropertyPrptotype({
   name: 'dataContext',
   editor: 'textbox',
   type: 'string',
   defaultValue: '',
   canBound: false,
});
