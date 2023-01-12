import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  showNewPassword: boolean = false;
  showOldPassword: boolean = false;
  showConfirmPassword: boolean = false;
  icon:string | undefined;

  constructor() { }

  ngOnInit(): void {
  }


  showNewHidePassword() {
    this.showNewPassword = !this.showNewPassword;

  }
  showOldHidePassword() {
    this.showOldPassword = !this.showOldPassword;

  }
  showConfirmHidePassword() {
    this.showConfirmPassword = !this.showConfirmPassword;

  }
  
  name = 'Angular';
}




