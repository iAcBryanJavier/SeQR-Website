import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
}) 
export class AuthService {
  loggedIn: boolean = false;

  constructor(private fireAuth: AngularFireAuth) { }

  isAuthenticated() {
    console.log(this.loggedIn)
    return this.loggedIn;
  }

  login(email: string, password: string){
    
  }
}
