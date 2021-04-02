import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CreateDynamicComponentService } from './create-dynamic-component.service';
import { ElementsModule } from './elements/elements.module';

const routes: Routes = [];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes), ElementsModule],
  exports: [RouterModule],
  providers: [CreateDynamicComponentService]
})
export class AppRoutingModule { }
