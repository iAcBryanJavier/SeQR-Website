import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  
  forgetPasswordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, this.notMatching('password')])
  });

  notMatching(controlName: string) {
    return (formControl: FormControl) => {
      const control = formControl.parent?.get(controlName);
      if (!control) {
        return null;
      }
      if (control.value !== formControl.value) {
        return { notMatching: true };
      }
      return null;
    };
  }

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

  onSubmit(){
    
  }
  
  name = 'Angular';
}

