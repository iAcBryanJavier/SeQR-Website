import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {
  showCountdown: boolean = true;
  countdown: number = 5;
  constructor(private router: Router) { }

  ngOnInit() {
    this.startCountdown();
  }

  redirectFunction(){
    this.router.navigate(['/dashboard']);
  }
  startCountdown() {
    setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.showCountdown = false;
        this.redirectFunction();
      }
    }, 1000);
  }
}
