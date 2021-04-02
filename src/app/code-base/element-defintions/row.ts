import { ToolboxElement } from "../repositories/element-repository";

export const EL_ROW: ToolboxElement = new ToolboxElement({
   name: 'Row',
   icon: 'las la-grip-lines',
   childrenTypes: ['Col'],
   parentType: ['Body', 'Col']
});
