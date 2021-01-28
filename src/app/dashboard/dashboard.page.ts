import { Component, OnInit } from '@angular/core';

import { AilmentService, Form } from '../services/af.service';
import {Storage} from '@ionic/storage'
import { ModalController } from '@ionic/angular';
import { ViewformPage } from '../viewform/viewform.page';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from '../services/patient.service';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  forms: Form[];
  public columns: any;
  public rows: any;
  private loggedIn : boolean;
  private rank;
  
  constructor(private ailmentService: AilmentService,private loginService: LoginService, private storage: Storage, public modalController: ModalController, private router: Router, private http: HttpClient) { 
    storage.get('loggedIn').then((val) => { this.loggedIn = val}),
    
    storage.get('userID').then((val) => {  this.loginService.getUser(val)
      .subscribe((response)=>{
        
         this.rank = response.rank
      });})
      
   
  }
  otherFunc(row) {
    if (row.Seen == true){
      return true;
    }else{
      return false;
    }
    
  }

  changePage(page){
    
    this.router.navigateByUrl('/'+page);
  }

  rowClass = (row) => {

    return {
      'row-color1': row.row.seen,
      'row-color2': !row.row.seen,
    };
  }

  setPrior(level, row){
    
    row.priority = level
    row.seen = true
    
    this.ailmentService.updateVisit(row.docId, row)
    .subscribe((response)=>{
       
        console.log(response); //<-- not undefined anymore
    });
  }

  setType(level, row){
    console.log("x")
    row.approved = level
    
    console.log(row)
    this.ailmentService.updateVisit(row.docId, row)
    .subscribe((response)=>{
       
        console.log(response); //<-- not undefined anymore
    });
    
  }
  async ngOnInit()  {
    
    this.ailmentService.getForms()
    .subscribe((response)=>{
        this.rows = response;
        console.log(this.rows); //<-- not undefined anymore
    });
    
      this.columns = [
        
        {name: "Ailment" },
        //{name: "Address"},
        {name: "Date" , prop: "dateSubmitted"},
        //{name: "NOK"},
        {name: "Patient"},
       
      
        {name: "Pain"},
      
        
  
        
      ]
      
   
   
   
   
   
    
      
      
   
   
  }

  
  async viewForm(row) {
    
    const modal = await this.modalController.create({
      component: ViewformPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'form' : row,
       
        
      }
    });
    return await modal.present();


   
  }

  edit(value) {
    console.log(value);
  }

  checkStatus(){
    if(this.loggedIn == true){
      return true;
    }else{
      return false;
    }
  }

  checkStaff(){
    if(this.rank == "staff"){
      
      return true;
    }else{
      return false;
    }
    
   
  }

  checkDoctor(){
    if(this.rank == "doctor"){
     
      return true;
    }else{
      return false;
    }
  }
  checkStatus2(){
    if(this.loggedIn == true){
      return false;
    }else{
      return true;
    }
  }

  delete(value) {
    console.log(value);
  }
 

}
