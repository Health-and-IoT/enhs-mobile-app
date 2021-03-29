import { getLocaleExtraDayPeriods } from '@angular/common';
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { config } from '../../assets/config';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export interface User{
    username: string;
    password: string;
    siteid: number;
    rank: string;
}
@Injectable({
    providedIn: 'root'
})
export class LoginService{
    private testCollection: AngularFirestoreCollection<User>;
    private users: Observable<User[]>;
    foundUser: User[];
    constructor(private db : AngularFirestore, private storage: Storage,  private http: HttpClient){
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
    // getUser(username: string, password: string, siteid: number) {
    //    return this.db.collection('users', ref => ref.where('username', '==', username).where('password', '==', password).where('siteid', '==', siteid)).snapshotChanges().
    //     pipe(switchMap(docRef => {
    //         this.storage.set('userID', docRef[0].payload.doc.id);
    //         this.storage.set('loggedIn', true);
    //         return this.db.collection('users').doc(docRef[0].payload.doc.id).valueChanges()
    //     }))
       
    //     }

    login(obj) : Observable<any> {
       
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
             Accept: 'application/json',
             'Access-Control-Allow-Origin': '*',
           
             //api token (if need)
      });    
      const options = {
        headers: header
      }
      
      return this.http.get("http://"+ config.ip +"/login/"+ obj, options).pipe(map((response: any) => response));
    }

    getUser(id) : Observable<any> {
       
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
             Accept: 'application/json',
             'Access-Control-Allow-Origin': '*',
           
             //api token (if need)
      });    
      const options = {
        headers: header
      }
      
      return this.http.get("http://"+ config.ip +"/getUser/"+id, options).pipe(map((response: any) => response));
    }
    
    updateUser(user:User, id:string){
        return this.testCollection.doc(id).update(user);
    }
    addUser(user:User){
        return this.testCollection.add(user);
    }
    getUserById(id){
       
        return this.testCollection.doc<User>(id).valueChanges();
    


    }
    removeUser(id){
        return this.testCollection.doc(id).delete(); 
    }
}