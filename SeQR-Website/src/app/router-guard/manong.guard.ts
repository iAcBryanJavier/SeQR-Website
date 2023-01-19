import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ManongService } from '../services/manong.service';

@Injectable()

export class ManongGuard implements CanActivate {

constructor(private router: Router, private manongService: ManongService) { }
  
  canActivate() {

    if (this.manongService.isAuthenticated()) {
      return true;
    }
    else {
      window.alert('Permission denied for this page. Please login first')
      this.router.navigate(['']);
      return false;
    }
  }
  
}
