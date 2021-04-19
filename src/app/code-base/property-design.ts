import { Binding, TBindingSource } from "./binding";
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

   bind(bindingSource: TBindingSource, path: string): PropertyDesign {
      this.valueType = 'dynamic';
      this.value = new Binding({ source: bindingSource, path });
      return this;
   }

   bindTo(binding: Binding): PropertyDesign {
      this.valueType = 'dynamic';
      this.value = binding;
      return this;
   }

   set(value: string): PropertyDesign {
      this.valueType = 'static';
      this.value = value;
      return this;
   }
}
