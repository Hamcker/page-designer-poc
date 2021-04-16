import { ElementDefinition } from "../element-definition";
import { PROP_DATACONTEXT } from "./frequent-properties";

export const EL_ROW: ElementDefinition = new ElementDefinition({
   name: 'Row',
   icon: 'las la-grip-lines',
   childrenTypes: ['Col'],
   parentTypes: ['Body', 'Col'],
   properties: [
      PROP_DATACONTEXT,
   ],
});
