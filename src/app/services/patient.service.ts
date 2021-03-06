import { getLocaleExtraDayPeriods } from '@angular/common';
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage';
import { User } from './login.service';
export interface Patient{
    name: string;
    dob: string;
    nok: string;
    address: string;
    chinumber: string;
    donor: boolean;
    allergies: string;
}
@Injectable({
    providedIn: 'root'
})
export class PatientService{
    private testCollection: AngularFirestoreCollection<Patient>;
    private users: Observable<Patient[]>;
    foundUser: Patient[];
    constructor(private db : AngularFirestore, private storage: Storage){
        this.testCollection = db.collection<Patient>('patient');
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
   
    
    updateUser(id:string, form:Patient){
        
        this.testCollection.doc(id).update(form);
        
    }
    addUser(form:Patient){
        return this.testCollection.add(form);
    }
   
    removeUser(id){
        return this.testCollection.doc(id).delete(); 
    }
}