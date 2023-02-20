import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { LoggingService } from './logging.service';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  schoolName!: any;

  constructor(private fireAuth: AngularFireAuth, private router: Router,
    private db: AngularFireDatabase, private logging: LoggingService) { }

  login(email: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(email, password)
    .then(user => {
        user.user?.getIdToken().then(idToken => {
            // Store the token in local storage
            localStorage.setItem('idToken', idToken);
            this.logging.log(("User has logged-in "+ idToken))
            localStorage.getItem('idToken');
            this.router.navigateByUrl('dashboard');
        });
    }, err => {
        
        window.alert("The email or password is incorrect");
        this.router.navigateByUrl('/login');
        throw "Login Failed, reason: might be forms related.";
    });

  }

  logout(){
    this.fireAuth.signOut().then(()=>{
      this.logging.log("User has logged out " + localStorage.getItem('idToken'));
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

  getSchoolName(){
    this.fireAuth.user.subscribe(user => {
      if (user) {
        // User is signed in
        // Get the user's UID
        const uid = user.uid;
        // Reference the user's name in the Realtime Database
        const nameRef = this.db.object(`users/${uid}/name`);

        // Read the user's name from the Realtime Database
        nameRef.valueChanges().subscribe(name => {
          this.schoolName = name;
        });
      } else {
        // User is signed out
        console.log('user is not signed in');
      }
    })
  }
  
  
   resetPassword(email: any){
    console.log(email);
    return this.fireAuth.sendPasswordResetEmail(email).then(() => {
      alert("Email has been sent! Check your email.")
    })
    .catch((error) => {
   
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }


}