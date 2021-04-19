import { ElementInstance } from "./element-instance";
import { InjectionToken } from "@angular/core";

export const INJ_PAGE_ELEMENT = new InjectionToken<ElementInstance>('Page Element Itself');
export const INJ_DATA_CONTEXT = new InjectionToken<{}>('Data Context');
export const INJ_ROOT_ELEMENT = new InjectionToken<ElementInstance>('Page\'s root element');
// export const INJ_DATA_CONTEXT = new InjectionToken<any>('DataContext being injected');
