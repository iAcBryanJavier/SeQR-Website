import { Component, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthService } from "src/app/services/auth.service";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:  ['./login.component.css']

})

export class LoginComponent implements OnInit  {
  
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    if(localStorage.getItem('idToken')){
      this.router.navigateByUrl('dashboard');
    }
  }

  email: string = '';
  password: string = '';

  login()  {
    this.authService.login(this.email, this.password);
  }

  reset(){
    this.authService.resetPassword(this.email);
  }
}