import { getLocaleExtraDayPeriods } from '@angular/common';
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
export interface User{
    username: string;
    password: string;
    siteid: number;
}
@Injectable({
    providedIn: 'root'
})
export class LoginService{
    private testCollection: AngularFirestoreCollection<User>;
    private users: Observable<User[]>;
    constructor(private db : AngularFirestore){
        this.testCollection = db.collection<User>('users');
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
    getUser(username: string, password: string, siteid: number) {
        return this.db.collection('users', ref => ref.where('username', '==', username).where('password', '==', password).where('siteid', '==', siteid)).valueChanges().subscribe(val => console.log(val) );
       
        
        
        }
    
    updateUser(user:User, id:string){
        return this.testCollection.doc(id).update(user);
    }
    addUser(user:User){
        return this.testCollection.add(user);
    }
    removeUser(id){
        return this.testCollection.doc(id).delete(); 
    }
}