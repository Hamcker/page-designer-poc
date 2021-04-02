import { ToolboxElement } from "../toolbox-element";

export const EL_ROW: ToolboxElement = new ToolboxElement({
   name: 'Row',
   icon: 'las la-grip-lines',
   childrenTypes: ['Col'],
   parentType: ['Body', 'Col']
});
