import { Component, HostListener, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BaseAlternativeComponent } from 'src/app/base/base-alternative.component';
import { BaseComponent } from 'src/app/base/base.component';
import { DataFormat } from '../models';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent extends BaseAlternativeComponent implements OnInit {

  
  constructor() { 
    super()
  }

  ngOnInit(): void {
    console.log(this.data);
    
  }

}
