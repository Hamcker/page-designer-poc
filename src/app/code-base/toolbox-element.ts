export class ToolboxElement {
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
