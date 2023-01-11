import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:  ['./login.component.css']

})

export class LoginComponent implements OnInit  {
  
  constructor(private router: Router)   {}
  ngOnInit(): void {}

  email: string | undefined;
  password: string | undefined;

  onClick()  {

    console.log("PUTANGINA MO")
    if (this.email === 'test@gmail.com' && this.password === 'test123') {
      this.router.navigateByUrl('dashboard');
      
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }


}