import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { LoginService, User } from '../services/login.service';
import {EncrDecrService} from '../services/eds.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
users: User[];
username:string;
password:string;
private newPass: string;
siteid:number;
  constructor(private storage: Storage, private http: HttpClient, private loginService: LoginService, private EncrDecr: EncrDecrService, private router: Router) {  

  }

  ngOnInit() {
    this.loginService.getUsers().subscribe(res =>{
      this.users = res;
    })
    
  }
  
  login(){
    this.newPass = this.password;
    this.newPass =  this.EncrDecr.set('123456$#@$^@1ERF', this.newPass);
    var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.password);
    //console.log(this.password);
    //console.log(decrypted);
    //let login1: User = {username: this.username, password:this.password, siteid: this.siteid, rank: "doctor"}
    //this.loginService.addUser(login1);
let obj = {username: this.username, password: this.newPass, siteid: this.siteid} ;
  this.loginService.login(obj)
    .then((response)=>{
      console.log('response: ', response);
      
      if(response.success == true){
       this.storage.set('loggedIn', true);
       this.storage.set('userID',response.id);
        location.reload()
       this.router.navigateByUrl('/dashboard')
    };

    //this.loginService.getUser(this.username, this.password,this.siteid).subscribe(data =>{this.router.navigateByUrl('/dashboard');});
   
    //let response = await this.loginService.login(obj);
    //   if(response.success == true){
    //     this.storage.set('loggedIn', true);
    //     this.storage.set('userID',response.id);
    //      location.reload()
    //     this.router.navigateByUrl('/dashboard')
    //  };

   
  })
}

}
