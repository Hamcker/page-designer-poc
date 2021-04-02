import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PageAllInOneComponent } from './components/page-all-in-one/page-all-in-one.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PageAllInOneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'corrected' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
