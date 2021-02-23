import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsPageRoutingModule } from './stats-routing.module';

import { StatsPage } from './stats.page';
import { HttpClientModule } from '@angular/common/http';
import {PapaParseModule} from 'ngx-papaparse';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsPageRoutingModule,
    HttpClientModule,
    PapaParseModule
  ],
  declarations: [StatsPage]
})
export class StatsPageModule {}
