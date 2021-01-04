import { Component, OnInit } from '@angular/core';

import { AilmentService, Form } from '../services/af.service';
import {Storage} from '@ionic/storage'
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
  constructor(private ailmentService: AilmentService, private storage: Storage) { 
    storage.get('loggedIn').then((val) => { this.loggedIn = val})
  }

  ngOnInit() {
    
    this.ailmentService.getUsers().subscribe(res =>{
      this.forms = res;
      this.columns = [
        {name: "Name"},
        {name: "Address"},
        {name: "DOB"},
        {name: "NOK"},
        {name: "Chinumber"},
        {name: "Illness"},
        {name: "Allergies"},
        {name: "Pain"},
        

        
      ]
      this.rows = this.forms;
    })
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

  delete(value) {
    console.log(value);
  }
  header(dat) {
    let h:any =[] //array to title columns
    let listHeader: any = Object.keys(dat) //getting the headings and adding
    listHeader.forEach(item => { //scanning the array of titles
      h.push({ name: item }) //adding the titles to the list
    })
    return h //retuning list
  }

}
