import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {

constructor(private router: Router) { }
  
  canActivate() {

    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      window.alert('Permission denied for this page. Please login first')
      this.router.navigate(['']);
      return false;
    }
  }
  
}
