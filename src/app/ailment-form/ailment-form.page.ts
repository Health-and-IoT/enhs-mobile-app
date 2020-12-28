import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ailment-form',
  templateUrl: './ailment-form.page.html',
  styleUrls: ['./ailment-form.page.scss'],

})
export class AilmentFormPage implements OnInit {
name: string;
dob: any;
nok: any;
address: any;
chinumber: any;
illness: any;
knobValues: any;

 slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor() { 
  
  }

  ngOnInit() {
  }
  nextSlide(slides) {
    slides.slideNext();
  }
  
  gatherInfo() {
    var info = {name: this.name, dob: this.dob, nok: this.nok, address: this.address, chinumber: this.chinumber, illness: this.illness, pain: this.knobValues}
    console.log(info);
  }
}
