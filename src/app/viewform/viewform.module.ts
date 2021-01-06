import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewformPageRoutingModule } from './viewform-routing.module';

import { ViewformPage } from './viewform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewformPageRoutingModule
  ],
  declarations: [ViewformPage]
})
export class ViewformPageModule {}
