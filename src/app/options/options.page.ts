import { Component, OnInit } from '@angular/core';


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

  constructor() { 

  }
  segmentChanged(){}

  ngOnInit() {
  }

}

export class segmentChanged {
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
