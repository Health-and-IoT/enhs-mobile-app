import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonAilmentPage } from './common-ailment.page';

const routes: Routes = [
  {
    path: '',
    component: CommonAilmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonAilmentPageRoutingModule {}
