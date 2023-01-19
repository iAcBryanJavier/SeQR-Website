import { Component, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ManongService } from "../manong.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:  ['./login.component.css']

})

export class LoginComponent implements OnInit  {
  
  constructor(private router: Router, private authService: ManongService, private fireAuth: AngularFireAuth) {}
  ngOnInit(): void {}

  email: string = '';
  password: string = '';

  login()  {

    // if (this.email === 'test@gmail.com' && this.password === 'test123') {
    //   this.authService.loggedIn = true;
    //   this.router.navigateByUrl('dashboard');
    // }
    // else {
    //   window.alert("The email or password is incorrect");
    //   this.authService.loggedIn = false;
    //   this.router.navigateByUrl('/login');
      
    // }
    
    this.fireAuth.signInWithEmailAndPassword(this.email, this.password).then(() => {
      this.authService.loggedIn = true;
      this.router.navigateByUrl('dashboard');
    }, err => {
      window.alert("The email or password is incorrect");
      this.authService.loggedIn = false;
      this.router.navigateByUrl('/login');
    }
    )
  }
}