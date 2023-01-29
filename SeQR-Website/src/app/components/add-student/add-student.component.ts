import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/interfaces/Student';
import { Encryption } from 'src/app/models/encryption';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  // form group for add stduent form to db 
  studentForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    middlename: new FormControl(''),
    lastname: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    batch: new FormControl('', Validators.required),
    studentId: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    soNumber: new FormControl('', Validators.required)
  })

  constructor(private db: DatabaseService) { }

  encryptFunction = new Encryption();

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.studentForm.valid){
      this.studentForm.setValue({
        studentId: this.encryptFunction.encryptData(this.studentForm.controls['studentId'].value),
        firstname: this.encryptFunction.encryptData(this.studentForm.controls['firstname'].value),
        middlename: this.encryptFunction.encryptData(this.studentForm.controls['middlename'].value),
        lastname: this.encryptFunction.encryptData(this.studentForm.controls['lastname'].value),
        course: this.encryptFunction.encryptData(this.studentForm.controls['course'].value),
        batch: this.encryptFunction.encryptData(this.studentForm.controls['batch'].value),
        sex: this.encryptFunction.encryptData(this.studentForm.controls['sex'].value),
        soNumber: this.encryptFunction.encryptData(this.studentForm.controls['soNumber'].value)
      })
      this.db.addStudent(this.studentForm.value);
    }
  }

  
}
