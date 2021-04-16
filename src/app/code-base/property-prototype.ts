import { TPropertyEditor, TPropertyType } from "./types";

export class PropertyPrptotype {
   name: string;
   type: TPropertyType;
   editor: TPropertyEditor;
   canBound?= true;
   defaultValue?: any;

   constructor(options?: PropertyPrptotype) {
      Object.assign(this, options);
   }
}
