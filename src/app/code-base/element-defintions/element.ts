export class Element {
   name: string;
   icon: string;
   childrenTypes?: string[] | false;
   parentTypes?: string[] | false;

   constructor({ name, childrenTypes, parentType: parentTypes, icon }: { name: string, childrenTypes?: string[] | false, parentType?: string[] | false, icon?: string }) {
      this.name = name;
      this.childrenTypes = childrenTypes ?? false;
      this.parentTypes = parentTypes ?? false;
      this.icon = icon;
   }
}

export const EL_BODY: Element = new Element({
   name: 'Body',
   icon: '',
   childrenTypes: ['Row'],
});

export const EL_ROW: Element = new Element({
   name: 'Row',
   icon: 'las la-grip-lines',
   childrenTypes: ['Col'],
   parentType: ['Body', 'Col']
});

export const EL_COL: Element = new Element({
   name: 'Col',
   icon: 'las la-grip-lines-vertical',
   parentType: ['Row'],
   childrenTypes: ['Row', 'Button']
});

export const EL_BUTTON: Element = new Element({
   name: 'Button',
   icon: 'las la-square',
   parentType: ['Col'],
});
