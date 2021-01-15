import { Component, OnInit } from '@angular/core';

import { AilmentService, Form } from '../services/af.service';
import {Storage} from '@ionic/storage'
import { ModalController } from '@ionic/angular';
import { ViewformPage } from '../viewform/viewform.page';
import { Router } from '@angular/router';
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
  
  constructor(private ailmentService: AilmentService, private storage: Storage, public modalController: ModalController, private router: Router) { 
    storage.get('loggedIn').then((val) => { this.loggedIn = val})
  }
  otherFunc(row) {
    if (row.seen == true){
      return true;
    }else{
      return false;
    }
    
  }

  changePage(page){
    
    this.router.navigateByUrl('/'+page);
  }

  rowClass = (row) => {
    console.log(row.row.seen)
    return {
      'row-color1': row.row.seen,
      'row-color2': !row.row.seen,
    };
  }

  setPrior(level, row){
    
    row.priority = level
    row.seen = true
    
    this.ailmentService.updateUser(row.id, row)
  }
  ngOnInit() {
    
    this.ailmentService.getUsers().subscribe(res =>{
      this.forms = res;
      this.columns = [
        
        {name: "Name", prop: "name"},
        //{name: "Address"},
        {name: "Date of Birth" , prop: "dob"},
        //{name: "NOK"},
        {name: "CHI Number", prop: "chinumber"},
        {name: "Illness"},
        {name: "Allergies"},
        {name: "Pain"},
        
        
        {name: "Date Sent", prop: "dateSubmitted"}
        

        
      ]
     
      this.rows = this.forms;
    })
  }

  async viewForm(row) {
    const modal = await this.modalController.create({
      component: ViewformPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'form' : row
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
