import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ManongService } from './manong.service';


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
