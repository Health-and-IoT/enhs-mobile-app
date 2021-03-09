import { Component, OnInit } from '@angular/core';

import { AilmentService, Form } from '../services/af.service';
import {Storage} from '@ionic/storage'
import { ModalController, Platform } from '@ionic/angular';
import { ViewformPage } from '../viewform/viewform.page';
import { ViewsympPage } from '../viewsymp/viewsymp.page';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginService } from '../services/login.service';
import { ActivatedRoute } from '@angular/router';
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
  public devWidth = this.platform.width();
  mobile: boolean;
  isEditable = {};
  
  constructor(public platform: Platform, private route: ActivatedRoute, private ailmentService: AilmentService,private loginService: LoginService, private storage: Storage, public modalController: ModalController, private router: Router, private http: HttpClient) { 
   
    storage.get('loggedIn').then((val) => { this.loggedIn = val}),
    
    storage.get('userID').then((val) => {  this.loginService.getUser(val)
      .subscribe((response)=>{
        
         this.rank = response.rank
       
         this.ailmentService.getForms(response.siteid)
    .subscribe((response)=>{
        this.rows = response;
        console.log(this.rows); //<-- not undefined anymore
    });
    
      this.columns = [
        
        {name: "Symptoms" },
        //{name: "Address"},
        {name: "Date" , prop: "dateSubmitted"},
        //{name: "NOK"},
        {name: "Patient"},
       
      
        {name: "Pain"},
      
        
  
        
      ]
      });})
      
   
  }
  otherFunc(row) {
    if (row.Seen == true){
      return true;
    }else{
      return false;
    }
    
  }

  checkDevWidth(){

    if(this.devWidth > 800 ){
      return true;
    }else{
      return false;
    }


  }

  // Save row
  save(row, rowIndex){
    this.isEditable[rowIndex]=!this.isEditable[rowIndex]
    console.log("Row saved: "+ rowIndex);
    this.ailmentService.updateVisit(row.docId, row)
    .subscribe((response)=>{
       
        console.log(response); //<-- not undefined anymore
    });
  }

  // Delete row
  delete(row :any , rowIndex){
    this.isEditable[rowIndex]=!this.isEditable[rowIndex]
    console.log(row.docID);
    this.ailmentService.deleteForm(row.docID)
    .subscribe((response)=>{
       
        console.log(response); //<-- not undefined anymore
    });
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
    
   
  }

  async viewSymp(row) {
    
    const modal = await this.modalController.create({
      component: ViewsympPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'form' : row,
       
        
      }
    });
    return await modal.present();


   
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

  
 

}
