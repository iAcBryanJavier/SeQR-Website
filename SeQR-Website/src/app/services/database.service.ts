import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../interfaces/Student';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afs: AngularFireDatabase, private http: HttpClient) { }

  student!: AngularFireObject<Student>;

  //add student
  addStudent(form: any){
    const ref = this.afs.list('students');
    ref.push(form);
  }

  getStudent(){
    this.student = this.afs.object('student');
    return this.student;
  }
}
