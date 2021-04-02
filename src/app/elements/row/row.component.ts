import { Component, HostListener, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BaseAlternativeComponent } from 'src/app/base/base-alternative.component';
import { BaseComponent } from 'src/app/base/base.component';
import { DataFormat } from '../models';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent extends BaseAlternativeComponent implements OnInit {
  

  constructor() {
    super()
   }
  
  ngOnInit(): void {
    console.log(this.data);
    
  }

}
