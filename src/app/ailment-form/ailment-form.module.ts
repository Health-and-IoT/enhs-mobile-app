import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AilmentFormPageRoutingModule } from './ailment-form-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';

import { AilmentFormPage } from './ailment-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    AilmentFormPageRoutingModule
  ],
  declarations: [AilmentFormPage]
})
export class AilmentFormPageModule {}
