import { Component, OnInit } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { LoginService, User } from './services/login.service';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'grid'
    },
    {
      title: 'Ailment Form',
      url: '/ailment-form',
      icon: 'medkit'
    },
    {
      title: 'Common Ailments',
      url: '/common-ailment',
      icon: 'list'
    },
    {
      title: 'Stats',
      url: '/stats',
      icon: 'bar-chart'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'help-circle'
    },
    {
      title: 'Events',
      url: '/events',
      icon: 'calendar'
    },
    {
      title: 'Contact',
      url: '/contact',
      icon: 'mail'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    }
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
private loggedIn : boolean;
private user: User;
username: String; 
rank: String;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private loginService: LoginService,
    private router: Router,
    public alertController: AlertController
    
  ) {
    this.initializeApp();
    //storage.set('loggedIn', false);
   
    
  }

  async getUser() {
   var result = await this.storage.get('userID').then((val) => { return this.loginService.getUserById(val)})
  return result;
  }
 
  showDetails(p){
    
  if(p.title == "Login" && this.loggedIn == true){
    return false;
  }else{
    return true;
  }
  }

  async logout(){
    this.storage.set('loggedIn', false);
    this.storage.set('userID', null);
    const alert = await this.alertController.create({
      header: 'Logged out!',
      message: 'You have successfully logged out. Redirecting to dashboard page.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            location.reload();
          }
        }
      ]
    });

    await alert.present();
   
  
   

  }
 
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  showProfile(){

  }
  checkStatus(){
    if(this.loggedIn == true){
      return true;
    }else{
      return false;
    }
  }

  

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
      
    }
    this.storage.get('loggedIn').then((val) => {
      console.log('User logged in? : ', val);
      if (val){
        this.loggedIn = true;
        this.storage.get('userID').then((val1) => { 
          this.loginService.getUserById(val1).subscribe(res =>{
            this.user = res;
            this.username = res.username;
            this.rank = res.rank;
            this.router.navigate(['/dashboard'])
          })
        })
        //console.log(this.username)

      }else{
        this.loggedIn = false;
      }
    });
  }
}
