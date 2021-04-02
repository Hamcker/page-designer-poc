import { Directive, Input } from '@angular/core';

import { Element } from '../code-base/element-defintions/element';

@Directive({
   selector: '[element]'
})
export class ElementDirective {

   @Input('elementd') element: Element;

   constructor() { }

}
