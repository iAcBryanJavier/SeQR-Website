import { Component, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ManongService } from "../manong.service";



@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:  ['./login.component.css']

})



export class LoginComponent implements OnInit  {
  
  constructor(private router: Router, private manongService: ManongService)   {}
  ngOnInit(): void {}

  email: string | undefined;
  password: string | undefined;

  onClick()  {

    if (this.email === 'test@gmail.com' && this.password === 'test123') {
      this.manongService.loggedIn = true;
      this.router.navigateByUrl('dashboard');
    }
    else {
      window.alert("The email or password is incorrect");
      this.manongService.loggedIn = false;
      this.router.navigateByUrl('/login');
      
    }
  }


}