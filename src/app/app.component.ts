import { Component, Inject, ViewChild, ViewContainerRef, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CONTENT_MAPPINGS } from './constants';
import { CreateDynamicComponentService } from './create-dynamic-component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'page-designer-poc';

  @ViewChild('container', { read: ViewContainerRef }) public target: ViewContainerRef;

  editorOptions = {formatOnType:true, language: 'json' };
  code = [
    {
      type: 'C',
      data: {t:1, name: 'Column data'},
      child : [
       { type: 'R',
      data: {t:1, name: 'Row data'},

       child : [
        { type: 'TI' , 
        data: {t:1, name: 'Input Anything'},
      },
        {type : 'B',
        data: {t:1, name: 'Press Button'},
      }
       ]}
      ]
    }
  ];
  monacoCode = JSON.stringify(Object.assign([], this.code));
  constructor(public sanitizer: DomSanitizer, private createDynamicComponentService: CreateDynamicComponentService,
    @Inject(CONTENT_MAPPINGS) private contentMappings: any,) {

  }
  ngAfterViewInit(): void {
    this.updateView();
  }
  ngOnInit(): void {
   
  }

  updateView() {
    this.target.clear();
    this.code.forEach(type => {
      const typeP = this.contentMappings[type.type];
      this.createDynamicComponentService.createComponent(type, typeP, this.target);
    })
  }

  // get scode(){
  //   return JSON.stringify(this.code);
  // }

  // set scode(code){
  //   try {
  //     this.code = JSON.parse(code);
  //   } catch (error) {
  //     return;
  //   }
  //   this.updateView()
  // }
  setScode() {
    this.code = JSON.parse(this.monacoCode)
    this.updateView()

  }
  get sanitizedCode() {
    return this.sanitizer.bypassSecurityTrustHtml(JSON.stringify(this.code));
  }

 

}
