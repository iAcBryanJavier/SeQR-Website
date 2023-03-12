import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RefreshComponentService {

  constructor(private router: Router) { }

  refresh(component: string) {
    this.router.navigate(['/'], { skipLocationChange: true }).then(() => {
      this.router.navigate([component]);
    });
  }
}
