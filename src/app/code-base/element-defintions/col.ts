import { ToolboxElement } from "../toolbox-element";

export const EL_COL: ToolboxElement = new ToolboxElement({
   name: 'Col',
   icon: 'las la-grip-lines-vertical',
   parentType: ['Row'],
   childrenTypes: ['Row', 'Button']
});
