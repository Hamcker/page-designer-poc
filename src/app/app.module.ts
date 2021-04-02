import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ElementComponent } from './components/element/element.component';
import { ElementsAreaComponent } from './components/elements-area/elements-area.component';
import { NgModule } from '@angular/core';
import { PageAllInOneComponent } from './components/page-all-in-one/page-all-in-one.component';
import { RendererBodyComponent } from './components/renderers/renderer-body/renderer-body.component';
import { RendererButtonComponent } from './components/renderers/renderer-button/renderer-button.component';
import { RendererColComponent } from './components/renderers/renderer-col/renderer-col.component';
import { RendererRowComponent } from './components/renderers/renderer-row/renderer-row.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { ViewDesignerComponent } from './components/view-designer/view-designer.component';
import { ViewViewerComponent } from './components/view-viewer/view-viewer.component';

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
      ElementComponent,
      RendererBodyComponent,
      RendererRowComponent,
      RendererColComponent,
      RendererButtonComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MonacoEditorModule.forRoot(monacoConfig),
      DragDropModule,
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
