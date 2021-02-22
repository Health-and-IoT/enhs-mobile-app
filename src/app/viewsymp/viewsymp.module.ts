import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewsympPageRoutingModule } from './viewsymp-routing.module';

import { ViewsympPage } from './viewsymp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewsympPageRoutingModule
  ],
  declarations: [ViewsympPage]
})
export class ViewsympPageModule {}
