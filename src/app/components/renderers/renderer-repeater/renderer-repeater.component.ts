import { Component, Injector, OnInit } from '@angular/core';
import { BaseRenderer } from 'src/app/code-base/base-renderer';
import { renderer } from 'src/app/code-base/decorators/renderer';
import { EL_Repeater } from 'src/app/code-base/element-defintions/repeater';
import { ElementInstance } from 'src/app/code-base/element-instance';

@Component({
   selector: 'app-renderer-repeater',
   templateUrl: './renderer-repeater.component.html',
   styleUrls: ['./renderer-repeater.component.scss']
})
@renderer(EL_Repeater)
export class RendererRepeaterComponent extends BaseRenderer implements OnInit {

   itemTemplate: ElementInstance;
   items: any[];

   constructor(injector: Injector) {
      super(injector);
   }

   ngOnInit(): void {
      this.catchElementInstance();

      this.logicalTreeChange.subscribe(_ => {
         this.catchElementInstance()
      });

      this.get('items').subscribe((items: any[]) => {
         this.items = items;
         // items.forEach(dataItem => {
         //    this.items.push(new ElementInstance(this.elementInstance, this.itemTemplate.definition));
         // });
      });
   }

   private catchElementInstance() {
      if (this.elementInstance.children.length) {
         this.itemTemplate = this.elementInstance.children[0];
      }
   }
}
