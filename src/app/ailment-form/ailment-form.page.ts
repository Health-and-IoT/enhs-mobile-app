import { Component, OnInit } from '@angular/core';

import { AilmentService, Form } from '../services/af.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
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
priority: string;
dateSubmitted: string;
seen: boolean; 

forms: Form[];
 slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private ailmentService: AilmentService, public alertController: AlertController, private router: Router) { 
  
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  ngOnInit() {
    this.ailmentService.getUsers().subscribe(res =>{
      this.forms = res;
    })
  }
  nextSlide(slides) {
    slides.slideNext();
  }

  async completedForm(){
    const alert = await this.alertController.create({
      header: 'Form submitted!',
      message: 'Your form has been submitted to the system. Please wait for a doctor to assess and respond to your form!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigateByUrl('/dashboard');
          }
        }
      ]
    });

    await alert.present();
  }

  isItemAvailable = false;
     items = [];

     initializeItems(){
         this.items = ["Abdominal aortic aneurism","Abcess", "Allergies", "Back pain", "Blisters", "Burn", "Dehydration", "Diabetes", "Cancer", "Neck pain", "Arm pain", "Stomach pain", "Leg pain", "Sore head", "Sore ears", "Sore nose", "Sore"];
     }
     test(item){
       this.illness = item
       console.log(item)
     }

     getItems(ev: any) {
         // Reset items back to all of the items
         this.initializeItems();

         // set val to the value of the searchbar
         const val = ev.target.value;

         // if the value is an empty string don't filter the items
         if (val && val.trim() !== '') {
             this.isItemAvailable = true;
             this.items = this.items.filter((item) => {
                 return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
             })
         } else {
             this.isItemAvailable = false;
         }
     }


  getPrior() : string{
    this.priority = "low";
    this.seen = false;
    return this.priority;
  }

  getDate() : string{
    this.dateSubmitted = new Date().toLocaleString();
    return this.dateSubmitted;
  }
  
  gatherInfo() {
    let form: Form = {name: this.name, dob: this.formatDate(this.dob), nok: this.nok, address: this.address, chinumber: this.chinumber, illness: this.illness, allergies: this.allergies, pain: this.knobValues, priority: this.getPrior(), dateSubmitted: this.getDate(), seen: this.seen}
    
    this.ailmentService.addUser(form);
    this.completedForm();
  }
}
