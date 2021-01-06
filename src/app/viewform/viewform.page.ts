import { Component, Input, OnInit } from '@angular/core';
import { Form } from '../services/af.service';

@Component({
  selector: 'app-viewform',
  templateUrl: './viewform.page.html',
  styleUrls: ['./viewform.page.scss'],
})
export class ViewformPage implements OnInit {
  @Input() form: Form;
  constructor() { }

  ngOnInit() {
    
  }

}
