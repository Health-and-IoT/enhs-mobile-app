import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewsympPage } from './viewsymp.page';

const routes: Routes = [
  {
    path: '',
    component: ViewsympPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsympPageRoutingModule {}
