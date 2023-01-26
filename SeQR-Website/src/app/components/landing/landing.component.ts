import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {}

  loginClick() {
    // if (user is already logged in) {
      this.router.navigateByUrl('/login');
    
      // if logged in na, dapat diretso sa dashboard
      // type here
      // elsee, login
  }

  scanClick() {
    this.router.navigateByUrl('/landing-scan')
  }

}
