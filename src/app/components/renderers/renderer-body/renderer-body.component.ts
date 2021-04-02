import { Component, OnInit } from '@angular/core';

import { EL_BODY } from 'src/app/code-base/element-defintions/body';
import { renderer } from 'src/app/code-base/decorators/rederer';

@Component({
   selector: 'app-renderer-body',
   templateUrl: './renderer-body.component.html',
   styleUrls: ['./renderer-body.component.scss']
})
@renderer(EL_BODY)
export class RendererBodyComponent implements OnInit {

   constructor() { }

   ngOnInit(): void {
   }

}
