import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {

constructor(private router: Router) { }
  
  canActivate() {

    if (localStorage.getItem('idUserEmail') && localStorage.getItem('idToken')) {
      return true;
    }
    else {
      window.alert('Permission denied for this page. Please login first')
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
