import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { resultOfQR } from 'src/assets/js/decode-script';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  email!: any;
  verify_password!: any;
  updated_password!: any;
  showNewPassword: boolean = false;
  showOldPassword: boolean = false;
  showConfirmPassword: boolean = false;
  icon: string | undefined;

  constructor(private authService: AuthService, private fireAuth: AngularFireAuth, private db: AngularFireDatabase) { }

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



  ngOnInit(): void {
    this.getEmail();
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

  logout() {
    this.authService.logout();
  }



  getEmail(): any {
    this.fireAuth.user.subscribe(user => {
      if (user) {
        // User is signed in
        // Get the user's email
        this.email = user.email
      } else {
        this.email = "false";
        console.log('user is not signed in');
      }
    })
  }

  async updatePassword() {

    if (this.email != "false") {
      try {
        const user = await this.fireAuth.signInWithEmailAndPassword(this.email, this.verify_password);
        await user.user?.updatePassword(this.updated_password);
        alert("Password has been updated!");
        this.logout();
      } catch (error) {
        console.error(error);
        alert("Wrong password");
      }
    }
  }
}