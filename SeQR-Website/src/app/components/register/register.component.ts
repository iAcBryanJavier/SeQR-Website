import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    schoolName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
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

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    let password = this.registerForm?.get('password')?.value;
    let confirmPassword = this.registerForm?.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      alert("Passwords do not match"); // display an error message
    } else {
      //submit the form
      this.auth.register(this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value,
        this.registerForm.controls['schoolName'].value)
        .then(()=>{
          window.alert('user successfully created');
        })

      this.resetForm();
    }
  }

  resetForm(){
    this.registerForm.reset();
  }
}
