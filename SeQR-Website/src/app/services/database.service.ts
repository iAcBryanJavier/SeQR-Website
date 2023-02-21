import { Injectable } from '@angular/core';

import { Student } from '../interfaces/Student';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { LoggingService } from './logging.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afs: AngularFireDatabase, private http: HttpClient, private logs:LoggingService) { }

  student!: AngularFireObject<Student>;

  //add student
  addStudent(student: any){
    const ref = this.afs.list('students');
    ref.push(student).then(()=>{
      window.alert('Student added to database!');
      this.logs.info("User: " + localStorage.getItem('idUserEmail')+ " added a student record");

    }).catch(() =>{
      window.alert('An error occured, please try again.');
      throw "Add Student Failed";
    });
  }

  getStudent(): Observable<any[]>{
    return this.afs.list('students').valueChanges();
  }

  getCourses(): Observable<any[]> {
    return this.afs.list('courses').valueChanges();
  }
}
