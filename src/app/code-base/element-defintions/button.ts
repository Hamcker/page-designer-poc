import { ElementDefinition } from "../element-definition";
import { PROP_DATACONTEXT } from "./frequent-properties";

export const EL_BUTTON: ElementDefinition = new ElementDefinition({
   name: 'Button',
   icon: 'las la-square',
   parentTypes: ['Col'],
   properties: [PROP_DATACONTEXT]
});
