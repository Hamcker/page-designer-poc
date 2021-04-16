import { TPropertyValue, TPropertyValueType } from "./types";

export class DatasourceParameter {
   name: string;
   valueType: TPropertyValueType;
   value: TPropertyValue;

   constructor(options?: DatasourceParameter) {
      Object.assign(this, options);
   }
}
