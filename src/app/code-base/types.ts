import { Binding } from "./binding";

export type TRenderMode = 'design' | 'run';
export type TPropertyType = 'string' | 'number' | 'boolean';
export type TPropertyEditor = 'textbox' | 'radio' | 'checkbox' | 'combobox';
export type TPropertyValueType = 'static' | 'dynamic';
export type TPropertyValue = string | number | boolean | Date | object | any[] | Binding;

