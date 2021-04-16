import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { DropZoneDirective } from './directives/drop-zone.directive';
import { ElementsAreaComponent } from './components/elements-area/elements-area.component';
import { NgModule } from '@angular/core';
import { PageAllInOneComponent } from './components/page-all-in-one/page-all-in-one.component';
import { RendererBodyComponent } from './components/renderers/renderer-body/renderer-body.component';
import { RendererButtonComponent } from './components/renderers/renderer-button/renderer-button.component';
import { RendererChildrenComponent } from './components/renderer-children/renderer-children.component';
import { RendererColComponent } from './components/renderers/renderer-col/renderer-col.component';
import { RendererDragHandlerComponent } from './components/renderer-drag-handler/renderer-drag-handler.component';
import { RendererOutletComponent } from './components/renderer-outlet/renderer-outlet.component';
import { RendererRowComponent } from './components/renderers/renderer-row/renderer-row.component';
import { RendererViewDirective } from './directives/renderer-view.directive';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { ViewDesignerComponent } from './components/view-designer/view-designer.component';
import { ViewViewerComponent } from './components/view-viewer/view-viewer.component';
import { ElementPropertiesComponent } from './components/element-properties/element-properties.component';
import { RendererInputComponent } from './components/renderers/renderer-input/renderer-input.component';
import { PropertyPipe } from './pipes/property.pipe';

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
      RendererBodyComponent,
      RendererRowComponent,
      RendererColComponent,
      RendererButtonComponent,
      RendererOutletComponent,
      RendererChildrenComponent,
      RendererDragHandlerComponent,
      RendererViewDirective,
      DropZoneDirective,
      ElementPropertiesComponent,
      RendererInputComponent,
      PropertyPipe
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
