import { getLocaleExtraDayPeriods } from '@angular/common';
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage';
export interface Form{
    name: string;
    dob: string;
    nok: string;
    address: string;
    chinumber: string;
    illness: string;
    allergies: string;
    pain: string;
}
@Injectable({
    providedIn: 'root'
})
export class AilmentService{
    private testCollection: AngularFirestoreCollection<Form>;
    private users: Observable<Form[]>;
    foundUser: Form[];
    constructor(private db : AngularFirestore, private storage: Storage){
        this.testCollection = db.collection<Form>('forms');
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
   
    
    updateUser(form:Form, id:string){
        return this.testCollection.doc(id).update(form);
    }
    addUser(form:Form){
        return this.testCollection.add(form);
    }
    getUserById(id){
       
        return this.testCollection.doc<Form>(id).valueChanges();
    


    }
    removeUser(id){
        return this.testCollection.doc(id).delete(); 
    }
}