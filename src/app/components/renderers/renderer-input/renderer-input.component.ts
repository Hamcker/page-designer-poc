import { Component, Injector, OnInit } from '@angular/core';

import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { EL_INPUT } from 'src/app/code-base/element-defintions/input';
import { renderer } from 'src/app/code-base/decorators/renderer';

@Component({
   selector: 'app-renderer-input',
   templateUrl: './renderer-input.component.html',
   styleUrls: ['./renderer-input.component.scss']
})
@renderer(EL_INPUT)
export class RendererInputComponent extends BaseRenderer implements OnInit {

   constructor(injector: Injector) {
      super(injector);
   }

   ngOnInit(): void {
   }

}
