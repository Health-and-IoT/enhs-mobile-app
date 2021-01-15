import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewformPage } from './viewform.page';

const routes: Routes = [
  {
    path: '',
    component: ViewformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewformPageRoutingModule {}
