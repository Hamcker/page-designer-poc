import { TPropertyValue, TPropertyValueType } from "./types";

import { PropertyPrptotype } from "./property-prototype";

export class PropertyDesign {
   definition: PropertyPrptotype;
   valueType: TPropertyValueType = 'static';
   value: TPropertyValue;

   constructor(options?: Partial<PropertyDesign>) {
      Object.assign(this, options);
      this.value = options.definition.defaultValue;
   }
}
