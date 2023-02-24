import { Injectable } from '@angular/core';

import { Student } from '../interfaces/Student';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { LoggingService } from './logging.service';
import { map, Observable } from 'rxjs';
import { Encryption } from '../models/encryption';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  decryptedList!: Observable <any[]>;
  encryptFunction = new Encryption;
  constructor(private afs: AngularFireDatabase, private http: HttpClient, private logs:LoggingService) { }

  studentList!: Observable <any[]>;

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

  setStudentList(){
    console.log(this.getStudent());
    this.studentList = this.getStudent();
  }

  getStudent(): Observable<any[]> {
    return this.afs.list('students').snapshotChanges().pipe(
      map((items: any[]) => {
        return items.map(item => {
          const data = item.payload.val();
          if (data) { // check if data is not null
            return {
              studentId: this.encryptFunction.decryptData(data.studentId),
              firstname: this.encryptFunction.decryptData(data.firstname),
              middlename: this.encryptFunction.decryptData(data.middlename),
              lastname: this.encryptFunction.decryptData(data.lastname),
              course: this.encryptFunction.decryptData(data.course),
              sex: this.encryptFunction.decryptData(data.sex),
              soNumber: this.encryptFunction.decryptData(data.soNumber)
            };
          } else {
            return null;
          }
        }).filter(item => item !== null); // remove null items from the array
      })
    );
  }
  
  
  

  getCourses(): Observable<any[]> {
    return this.afs.list('courses').valueChanges();
  }


  getSearchStudent(query: string): Observable<any[]> {
    return this.studentList.pipe(
      map((students: any[]) => {
        return students.filter((student: any) => {
          const values = Object.values(student);
          return values.some((value: any) => typeof value === 'string' && value.includes(query));
        });
      })
    );
  }
  
}
