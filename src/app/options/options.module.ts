import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {TextToSpeech} from '@ionic-native/text-to-speech/ngx';

import { OptionsPageRoutingModule } from './options-routing.module';

import { OptionsPage } from './options.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsPageRoutingModule
  ],
  declarations: [
    OptionsPage
  ],
  providers: [
    TextToSpeech
  ]
})
export class OptionsPageModule {}
