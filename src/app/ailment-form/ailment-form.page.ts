import { Component, OnInit } from '@angular/core';
import { AilmentService, Form } from '../services/af.service';
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
allergies: any;
knobValues: any;
forms: Form[];
 slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private ailmentService: AilmentService) { 
  
  }

  ngOnInit() {
    this.ailmentService.getUsers().subscribe(res =>{
      this.forms = res;
    })
  }
  nextSlide(slides) {
    slides.slideNext();
  }
  
  gatherInfo() {
    let form: Form = {name: this.name, dob: this.dob, nok: this.nok, address: this.address, chinumber: this.chinumber, illness: this.illness, allergies: this.allergies, pain: this.knobValues}
    this.ailmentService.addUser(form);
  }
}
