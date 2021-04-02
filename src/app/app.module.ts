import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ElementDirective } from './directives/element.directive';
import { ElementsAreaComponent } from './components/elements-area/elements-area.component';
import { NgModule } from '@angular/core';
import { PageAllInOneComponent } from './components/page-all-in-one/page-all-in-one.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { ViewDesignerComponent } from './components/view-designer/view-designer.component';
import { ViewViewerComponent } from './components/view-viewer/view-viewer.component';
import { ElementComponent } from './components/element/element.component';

const monacoConfig: NgxMonacoEditorConfig = {
   defaultOptions: { theme: 'vs-dark', innerWidth: '100px' }, // pass default options to be used
   // onMonacoLoad: () => { console.log((<any>window).monaco); } // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
};

@NgModule({
   declarations: [
      AppComponent,
      PageAllInOneComponent,
      ViewDesignerComponent,
      ViewViewerComponent,
      ToolboxComponent,
      ElementsAreaComponent,
      ElementDirective,
      ElementComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      MonacoEditorModule.forRoot(monacoConfig),
      DragDropModule,
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
