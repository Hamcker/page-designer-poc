import { Component, OnInit } from '@angular/core';
import { BaseAlternativeComponent } from 'src/app/base/base-alternative.component';

@Component({
  selector: 'app-textinput',
  templateUrl: './textinput.component.html',
  styleUrls: ['./textinput.component.scss']
})
export class TextinputComponent extends BaseAlternativeComponent implements OnInit {

  constructor() { 
    super()
  }

  ngOnInit(): void {
  }

}
