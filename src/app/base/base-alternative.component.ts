import { Component, HostListener, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { DataFormat } from '../elements/models';

@Component({
  selector: 'book',
  template: `<h3>Book is: {{name}}!</h3>`
})
export class BaseAlternativeComponent  {
  @ViewChild('container', { read: ViewContainerRef,  static: true }) embeddedContainer: ViewContainerRef;

  mouseover = false;

  @Input() name: string;
  @Input() data: DataFormat;

  @HostListener('mouseenter', ['$event'])
  handleEnter(event: KeyboardEvent) {
   console.log('mouseover triggered', event.target);
   this.mouseover = true;
   event.stopPropagation();
  }

  @HostListener('mouseleave', ['$event'])
  handleLeave(event: KeyboardEvent) {
   console.log('leave triggered', event.target);
   this.mouseover = false;
   event.stopPropagation();
  }

}