import { ToolboxElement } from "../repositories/element-repository";

export const EL_COL: ToolboxElement = new ToolboxElement({
   name: 'Col',
   icon: 'las la-grip-lines-vertical',
   parentType: ['Row'],
   childrenTypes: ['Row', 'Button']
});
