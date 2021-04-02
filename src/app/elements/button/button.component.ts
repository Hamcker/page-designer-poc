import { Component, OnInit } from '@angular/core';
import { BaseAlternativeComponent } from 'src/app/base/base-alternative.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends BaseAlternativeComponent implements OnInit {

  constructor() { 
    super()
  }

  ngOnInit(): void {
  }

}
