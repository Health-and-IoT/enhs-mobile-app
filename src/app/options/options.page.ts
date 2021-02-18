import { Component, OnInit } from '@angular/core';
import { ClickType } from '@swimlane/ngx-datatable';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
  
})

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

 
  text:string;
  locale:string;
  rate:number;
  segmentChanged(
  ){
    
  }

  ngOnInit() {
  }
  Text = [];
  constructor(){

  }
  playText(){
    
  }

 

}

export class segmentChanged {
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
