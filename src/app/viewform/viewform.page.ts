import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Form, AilmentService } from '../services/af.service';
import { Patient } from '../services/patient.service';

@Component({
  selector: 'app-viewform',
  templateUrl: './viewform.page.html',
  styleUrls: ['./viewform.page.scss'],
})
export class ViewformPage implements OnInit {
  @Input() form: any;
  patient: Patient;
  visits : any;
  progList : any;
  
  
  constructor(private http: HttpClient, private ailmentService: AilmentService) { }

  async ngOnInit() {
    this.patient = {name: "", nok: "", dob: "", address: "", allergies: "", chinumber: "", donor: false}
   
    this.progList = JSON.parse(this.form.progList)
    this.progList.sort(function(a, b) {
      return parseFloat(b.sympCount) - parseFloat(a.sympCount) ;
  });
  console.log(this.progList)
    this.ailmentService.getVisits(this.form.patient)
  .then((response)=>{
    
    this.visits = response
    this.ailmentService.getPatient(this.form.patient)
  .then((response)=>{
    
    this.patient = response
    
  
  });
  
  });


}



}
