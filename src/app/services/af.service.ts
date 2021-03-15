
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { config } from '../../assets/config';
import { Storage } from '@ionic/storage';

import { HttpClient, HttpHeaders } from '@angular/common/http';
export interface Form{
    Symptoms: string[];
    Pain: string;
    Priority: string;
    DateSubmitted: string;
    Seen: boolean;
    patient: string; 
    Approved: boolean;
    DocID: string;
    ProgList: string;
    FinProg: string;
    SiteID: string;
    Email: string;
  
 
}
@Injectable({
    providedIn: 'root'
})
export class AilmentService{
    private readonly URL = 'assets/config.json';
    private testCollection: AngularFirestoreCollection<Form>;
    private users: Observable<Form[]>;
   
    foundUser: Form[];
    constructor(private db : AngularFirestore, private storage: Storage, private http: HttpClient){
        this.testCollection = db.collection<Form>('form');
        this.users = this.testCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a=> {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ... data};
                });
            })
        );

        
    }
   ngOnInit(){
    
   }

    

    getUsers(){
        return this.users;
    }

    getForms(id) : Observable<any> {
       
    const header = new HttpHeaders({
        'Content-Type': 'application/json',
         Accept: 'application/json',
         'Access-Control-Allow-Origin': '*',
       
        
  });    
  const options = {
    headers: header
  }
  
  return this.http.post("http://"+ config.ip +"/getPatients/" + id , options).pipe(map((response: any) => response));
}

getPatient(row : any) : Observable<any> {
       
    const header = new HttpHeaders({
        'Content-Type': 'application/json',
         Accept: 'application/json',
         'Access-Control-Allow-Origin': '*',
       
         //api token (if need)
  });    
  const options = {
    headers: header
  }
  
  return this.http.post("http://"+ config.ip +"/getPatient/" + row, options).pipe(map((response: any) => response));
}

getVisits(row : any) : Observable<any> {
       
    const header = new HttpHeaders({
        'Content-Type': 'application/json',
         Accept: 'application/json',
         'Access-Control-Allow-Origin': '*',
       
         //api token (if need)
  });    
  const options = {
    headers: header
  }
  
  return this.http.post("http://"+ config.ip +"/getVisits/" + row, options).pipe(map((response: any) =>response));
}

getSymptoms() : Observable<any> {
       
  const header = new HttpHeaders({
      'Content-Type': 'application/json',
       Accept: 'application/json',
       'Access-Control-Allow-Origin': '*',
     
       //api token (if need)
});    
const options = {
  headers: header
}

return this.http.get("http://"+ config.ip +"/symptoms", options).pipe(map((response: any) =>response));
}
updateVisit(id: any, row : any) : Observable<any> {
       
    const header = new HttpHeaders({
        'Content-Type': 'application/json',
         Accept: 'application/json',
         'Access-Control-Allow-Origin': '*',
       
         //api token (if need)
  });    
  const options = {
    headers: header
  }
  
  return this.http.post("http://"+ config.ip +"/updateForm/" + id, row, options).pipe(map((response: any) => response));
}

deleteForm(id: any) : Observable<any> {
       
    const header = new HttpHeaders({
        'Content-Type': 'application/json',
         Accept: 'application/json',
         'Access-Control-Allow-Origin': '*',
       
         //api token (if need)
  });    
  const options = {
    headers: header
  }
  
  return this.http.post("http://"+ config.ip +"/deleteForm/" + id, options).pipe(map((response: any) => response));
}

getSite(id: any) : Observable<any> {
       
    const header = new HttpHeaders({
        'Content-Type': 'application/json',
         Accept: 'application/json',
         'Access-Control-Allow-Origin': '*',
       
         //api token (if need)
  });    
  const options = {
    headers: header
  }
  
  return this.http.post("http://"+ config.ip +"/getSite/" + id, options).pipe(map((response: any) => response));
}
  
getAllEvents() : Observable<any> {
       
  const header = new HttpHeaders({
      'Content-Type': 'application/json',
       Accept: 'application/json',
       'Access-Control-Allow-Origin': '*',
     
       //api token (if need)
});    
const options = {
  headers: header
}

return this.http.post("http://"+ config.ip +"/getAllEvents", options).pipe(map((response: any) => response));
}
    
    updateUser(id:string, form:Form){
        
        this.testCollection.doc(id).update(form);
        
    }
    addUser(form:Form){
        return this.testCollection.add(form);
    }
   
    removeUser(id){
        return this.testCollection.doc(id).delete(); 
    }
}