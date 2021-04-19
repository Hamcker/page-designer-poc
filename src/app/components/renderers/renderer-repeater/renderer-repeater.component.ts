import { Component, Injector, OnInit } from '@angular/core';
import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { renderer } from 'src/app/code-base/decorators/renderer';
import { EL_Repeater } from 'src/app/code-base/element-defintions/repeater';

@Component({
   selector: 'app-renderer-repeater',
   templateUrl: './renderer-repeater.component.html',
   styleUrls: ['./renderer-repeater.component.scss']
})
@renderer(EL_Repeater)
export class RendererRepeaterComponent extends BaseRenderer implements OnInit {

   constructor(injector: Injector) {
      super(injector);
   }

   ngOnInit(): void {
   }

}
