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
         this.items = ["itching","skin_rash","nodal_skin_eruptions","continuous_sneezing","shivering","chills","joint_pain","stomach_pain","acidity","ulcers_on_tongue",
        "muscle_wasting","vomiting","burning_micturition","spotting_ urination","fatigue","weight_gain","anxiety","cold_hands_and_feets","mood_swings","weight_loss",
      "restlessness","lethargy","patches_in_throat","irregular_sugar_level","cough","high_fever","sunken_eyes","breathlessness","sweating","dehydration","indigestion",
      "headache","yellowish_skin","dark_urine","nausea","loss_of_appetite","pain_behind_the_eyes","back_pain","constipation","abdominal_pain","diarrhoea","mild_fever",
      "yellow_urine","yellowing_of_eyes","acute_liver_failure","fluid_overload","swelling_of_stomach","swelled_lymph_nodes","malaise","blurred_and_distorted_vision",
      "phlegm","throat_irritation","redness_of_eyes","sinus_pressure","runny_nose","congestion","chest_pain","weakness_in_limbs","fast_heart_rate","pain_during_bowel_movements",
      "pain_in_anal_region","bloody_stool","irritation_in_anus","neck_pain","dizziness","cramps","bruising","obesity","swollen_legs","swollen_blood_vessels","puffy_face_and_eyes",
      "enlarged_thyroid","brittle_nails","swollen_extremeties","excessive_hunger","extra_marital_contacts","drying_and_tingling_lips","slurred_speech","knee_pain",
      "hip_joint_pain","muscle_weakness","stiff_neck","swelling_joints","movement_stiffness","spinning_movements","loss_of_balance","unsteadiness","weakness_of_one_body_side",
      "loss_of_smell","bladder_discomfort","foul_smell_of urine","continuous_feel_of_urine","passage_of_gases","internal_itching","toxic_look_(typhos)","depression",
      "irritability","muscle_pain","altered_sensorium","red_spots_over_body","belly_pain","abnormal_menstruation","dischromic _patches","watering_from_eyes","increased_appetite",
      "polyuria","family_history","mucoid_sputum","rusty_sputum","lack_of_concentration","visual_disturbances","receiving_blood_transfusion","receiving_unsterile_injections",
        "coma","stomach_bleeding","distention_of_abdomen","history_of_alcohol_consumption","fluid_overload","blood_in_sputum","prominent_veins_on_calf","palpitations",
      "painful_walking","pus_filled_pimples","blackheads","scurring","skin_peeling","silver_like_dusting","small_dents_in_nails","inflammatory_nails","blister","red_sore_around_nose",
        "yellow_crust_ooze"];
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
