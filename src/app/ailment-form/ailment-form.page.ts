import { Component, OnInit } from '@angular/core';

import { AilmentService, Form } from '../services/af.service';
import { AlertController, Platform} from '@ionic/angular';

import { Router } from '@angular/router';
import { Patient, PatientService } from '../services/patient.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicSelectableComponent } from 'ionic-selectable';
import { config } from '../../assets/config';
import { Storage } from '@ionic/storage';
class Port {
  public id: number;
  public name: string;
  public prettyName: string;
}

@Component({
  selector: 'app-ailment-form',
  templateUrl: './ailment-form.page.html',
  styleUrls: ['./ailment-form.page.scss'],

})

export class AilmentFormPage implements OnInit {
ports: Port[];
port: Port;
s: Port[];
symptoms: string[];
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
sitecode: string;
email: string;
private maxSub: boolean;

forms: Form[];
 slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: true
  };
  
  constructor(private storage: Storage, private ailmentService: AilmentService, public alertController: AlertController, private router: Router, private patientService: PatientService, private http: HttpClient, public platform: Platform) { 
    if (this.platform.is('ios')) {
      this.slideOpts.allowTouchMove = true;
     }
     if (this.platform.is('android')) {
      
      this.slideOpts.allowTouchMove = true;
     }else{
      this.slideOpts.allowTouchMove = false;
     }
     
   
   
    
  }
 
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    
    this.s.push(event.value)
    //console.log(this.s[0])
    //console.log(this.s[1])
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
    this.ports = [];
    this.symptoms = [];
    this.ailmentService.getSymptoms()
   .then((response)=>{
      
      this.ports = response;
      //console.log(this.ports[0].prettyName)
      this.ports.sort(function(a, b) {
       var textA = a.name.toUpperCase();
       var textB = b.name.toUpperCase();
       return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
   });
   });
   
    
  }
  scanQrCode(){
    this.sitecode = "111"
  }
  async initBut(slides){
    
    this.storage.get('formSubMax').then(async (val) => { 
      if(val == true){
        const alert = await this.alertController.create({
          header: 'Max Form Submission!',
          message: 'To prevent system overload and potential crashing, testing and prototyping has been limited to 1 form per device.',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.router.navigateByUrl('/dashboard');
                location.reload()
              }
            }
          ]
        });
    
        await alert.present();
      
      }else{
        slides.slideNext();
       
      }

    })
  
    
  }
  
  firstBut(slides){
   
      slides.slideNext();
      this.ailmentService.getSite(this.sitecode).then(res =>{
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
            location.reload()
          }
        }
      ]
    });

    await alert.present();
  }

  isItemAvailable = false;
     items = [];

    
    
     test(item){
     

       this.illness = item
       //console.log(item)
     }

     getItems(ev: any) {
         // Reset items back to all of the items
         
         
         
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
    
    //console.log(this.symptoms)
    var i;
     for (i = 0; i < this.s.length; i++) {
       if(this.s[i].name == undefined){
         break;
       }else{
       this.symptoms.push(this.s[i].name)
       }
    
    } 
   
    let patient: Patient = {name: this.name, dob: this.formatDate(this.dob), nok: this.nok, address: this.address, chinumber: this.chinumber,  allergies: this.allergies, donor: true}
    let form: Form = {Symptoms: this.symptoms, Pain: this.knobValues, Priority: this.getPrior(), DateSubmitted: this.getDate(), Seen: this.seen, patient: "", Approved: false, DocID: "", ProgList: "", FinProg: "", SiteID: this.sitecode, Email: this.email}
    
    
let obj = {patient,form};
this.ailmentService.submitForm(obj).then(res =>{
  console.log(res)
  this.completedForm();
  this.storage.set('formSubMax', true);
})
    
  }
}
