import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router,
    private db: AngularFireDatabase) { }

  login(email: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(email, password)
    .then(user => {
        user.user?.getIdToken().then(idToken => {
            // Store the token in local storage
            localStorage.setItem('idToken', idToken);
            this.router.navigateByUrl('dashboard');
        });
    }, err => {
        window.alert("The email or password is incorrect");
        this.router.navigateByUrl('/login');
    });

  }

  logout(){
    this.fireAuth.signOut().then(()=>{
      localStorage.removeItem('idToken');
      this.router.navigateByUrl('login');
    }, err =>{
      alert(err.message);
    }
    )
  }

  register(email: any, password: any, name: any){
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      // Get the user's ID token
      return user.user?.getIdToken().then(idToken => {
        // Write the new user's name and ID token to the Realtime Database
        this.db.database.ref(`users/${user.user?.uid}`).set({
          name,
          idToken
        });
      });
    });
  }
  
}
