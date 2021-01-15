import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommonAilmentPageRoutingModule } from './common-ailment-routing.module';

import { CommonAilmentPage } from './common-ailment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonAilmentPageRoutingModule
  ],
  declarations: [CommonAilmentPage]
})
export class CommonAilmentPageModule {}
