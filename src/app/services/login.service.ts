import { getLocaleExtraDayPeriods } from '@angular/common';
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { map, switchMap, catchError } from 'rxjs/operators';
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
  
//     async login(obj){
        
        
//         const rawResponse = await fetch('https://'+ config.ip +'/login/', {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(obj)
//         });
//         const content = await rawResponse.json();
//       return content;
       
    
  
    
  

// }
    async login(obj)  {
        const response = await fetch("https://"+ config.ip +"/login/", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(obj) // body data type must match "Content-Type" header
          });
          return response.json(); 
       
     
      
    }

    async getUser(id)  {
       
        const response = await fetch("https://"+ config.ip +"/getUser/"+id, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          
          });
          return response.json(); 
      
     
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