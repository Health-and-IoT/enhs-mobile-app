import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AilmentFormPage } from './ailment-form.page';

const routes: Routes = [
  {
    path: '',
    component: AilmentFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AilmentFormPageRoutingModule {}
