import { ElementDefinition } from "../element-definition";
import { PROP_DATACONTEXT } from "./frequent-properties";

export const EL_BODY: ElementDefinition = new ElementDefinition({
   name: 'Body',
   icon: '',
   childrenTypes: ['Row', 'Repeater'],
   properties: [PROP_DATACONTEXT]
});
