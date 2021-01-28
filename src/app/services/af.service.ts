
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage';

import { HttpClient, HttpHeaders } from '@angular/common/http';
export interface Form{
    Ailment: string;
    Pain: string;
    Priority: string;
    DateSubmitted: string;
    Seen: boolean;
    patient: string; 
    Approved: boolean;
    DocID: string;
}
@Injectable({
    providedIn: 'root'
})
export class AilmentService{
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
    getUsers(){
        return this.users;
    }

    getForms() : Observable<any> {
       
    const header = new HttpHeaders({
        'Content-Type': 'application/json',
         Accept: 'application/json',
         'Access-Control-Allow-Origin': '*',
       
         //api token (if need)
  });    
  const options = {
    headers: header
  }
  
  return this.http.post("http://localhost:8080/getPatients", options).pipe(map((response: any) => response));
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
  
  return this.http.post("http://localhost:8080/getPatient/" + row, options).pipe(map((response: any) => response));
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
  
  return this.http.post("http://localhost:8080/getVisits/" + row, options).pipe(map((response: any) =>response));
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
  
  return this.http.post("http://localhost:8080/updateV/" + id, row, options).pipe(map((response: any) => response));
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
  
  return this.http.post("http://localhost:8080/getSite/" + id, options).pipe(map((response: any) => response));
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