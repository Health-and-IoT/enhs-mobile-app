import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { LoginService, User } from '../services/login.service';
import {EncrDecrService} from '../services/eds.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
users: User[];
username:string;
password:string;
siteid:number;
  constructor(private loginService: LoginService, private EncrDecr: EncrDecrService) {  

  }

  ngOnInit() {
    this.loginService.getUsers().subscribe(res =>{
      this.users = res;
    })
  }
  user : User = {
    username: "Test",
    password: "Test", 
   
    siteid: 111,
  }
  login(){
    this.password =  this.EncrDecr.set('123456$#@$^@1ERF', this.password);
    var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.password);
    console.log(this.password);
    console.log(decrypted);
    //let login1: User = {username: this.username, password:this.password, siteid: this.siteid}
  
    console.log(this.loginService.getUser(this.username, this.password,this.siteid));
    //this.loginService.addUser(login1);

   
  }

}
