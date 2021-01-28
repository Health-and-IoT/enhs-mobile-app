import { Component, OnInit } from '@angular/core';

import { AilmentService, Form } from '../services/af.service';
import { AlertController, Platform} from '@ionic/angular';

import { Router } from '@angular/router';
import { Patient, PatientService } from '../services/patient.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {QRCode} from 'qrcode';
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
donor: boolean;
approved: boolean;
sitename: string;
siteAdd: string; 


forms: Form[];
 slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: true
  };
  
  constructor(private ailmentService: AilmentService, public alertController: AlertController, private router: Router, private patientService: PatientService, private http: HttpClient, public platform: Platform) { 
    if (this.platform.is('ios')) {
      this.slideOpts.allowTouchMove = true;
     }
     if (this.platform.is('android')) {
      
      this.slideOpts.allowTouchMove = true;
     }else{
      this.slideOpts.allowTouchMove = false;
     }
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

    this.ailmentService.getSite("111").subscribe(res =>{
      this.sitename = res.name
      this.siteAdd = res.address
    })
    
  }
  backSlide(slides) {
    slides.slidePrev();
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
    let patient: Patient = {name: this.name, dob: this.formatDate(this.dob), nok: this.nok, address: this.address, chinumber: this.chinumber,  allergies: this.allergies, donor: true}
    let form: Form = {Ailment: this.illness, Pain: this.knobValues, Priority: this.getPrior(), DateSubmitted: this.getDate(), Seen: this.seen, patient: "", Approved: false, DocID: ""}
    
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
       Accept: 'application/json',
       'Access-Control-Allow-Origin': '*',
     
       //api token (if need)
});    
const options = {
  headers: header
}
let obj = {
  patient,
  form}
  ;
let response = this.http.post("http://localhost:8080/", obj, options);
   response.toPromise().then(data => {
     console.log('response: ', data);
     //TODO: handle HTTP errors
   }).catch((err) =>{
      console.log('error', err);
   });
    //this.ailmentService.addUser(form);
    this.completedForm();
  }
}
