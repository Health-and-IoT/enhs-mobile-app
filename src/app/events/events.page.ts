import { Component, OnInit } from '@angular/core';
import { AilmentService, Form } from '../services/af.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  events: any
  startDate: any
  endDate: any
  constructor(private ailmentService: AilmentService) { this.ailmentService.getAllEvents()   
    .subscribe((response)=>{
      this.events = response
        console.log(response)
    });}

  ngOnInit() {
    
   
    }

    searchDate(){
      
      const d1 = Date.parse(this.startDate)
      const d2 = Date.parse(this.endDate)
    
     
     
      var i
      for (i = 0; i < this.events.length; i++) {
       
       if( Date.parse(this.events[i].date) >= d1 &&  Date.parse(this.events[i].date) <= d2){
         console.log(this.events[i])
       }else{
         console.log(this.events[i])
       }
     
     } 
    }


}
