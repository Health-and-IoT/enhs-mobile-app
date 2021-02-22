import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Form, AilmentService } from '../services/af.service';
import { Patient } from '../services/patient.service';

@Component({
  selector: 'app-viewsymp',
  templateUrl: './viewsymp.page.html',
  styleUrls: ['./viewsymp.page.scss'],
})
export class ViewsympPage implements OnInit {
  @Input() form: any;
  patient: Patient;
  visits : any;
  progList : any;
  symptoms: any;
  
  constructor(private http: HttpClient, private ailmentService: AilmentService) { }

  async ngOnInit() {
    this.patient = {name: "", nok: "", dob: "", address: "", allergies: "", chinumber: "", donor: false}
   
    this.progList = JSON.parse(this.form.progList)
    this.symptoms = this.form.symptoms
    this.progList.sort(function(a, b) {
      return parseFloat(b.sympCount) - parseFloat(a.sympCount) ;
  });
  console.log(this.symptoms)
    this.ailmentService.getVisits(this.form.patient)
  .subscribe((response)=>{
    
    this.visits = response
    this.ailmentService.getPatient(this.form.patient)
  .subscribe((response)=>{
    
    this.patient = response
    
  
  });
  
  });


}



}
