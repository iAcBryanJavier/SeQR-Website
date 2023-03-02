import { Injectable } from '@angular/core';

import { Student } from '../interfaces/Student';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';

import PinataClient, { PinataPinOptions } from '@pinata/sdk';
import { environment } from 'src/environments/environment';
import { ethers } from 'ethers';
import contract from '../../../src/app/contracts/Student.json';
import { LoggingService } from './logging.service';
import { map, Observable } from 'rxjs';
import { Encryption } from '../models/encryption';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  student!: AngularFireObject<Student>;
  studentList!: Observable <any[]>;
  decryptedList!: Observable <any[]>;
  encryptFunction = new Encryption;
  public maleCount = 0;
  public femaleCount = 0;

  constructor(private afs: AngularFireDatabase, private http: HttpClient, private logs:LoggingService) { }

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

  getStudentsByGender(gender: string): Observable<{ males: number, females: number }> {
    return this.afs.list('students').snapshotChanges().pipe(
      map((items: any[]) => {
        const students = items.map(item => {
          const data = item.payload.val();
          if (data) { // check if data is not null
            const student = {
              studentId: this.encryptFunction.decryptData(data.studentId),
              firstname: this.encryptFunction.decryptData(data.firstname),
              middlename: this.encryptFunction.decryptData(data.middlename),
              lastname: this.encryptFunction.decryptData(data.lastname),
              course: this.encryptFunction.decryptData(data.course),
              sex: this.encryptFunction.decryptData(data.sex),
              soNumber: this.encryptFunction.decryptData(data.soNumber)
            };
            return student;
          } else {
            return null;
          }
        }).filter(item => item !== null) // remove null items from the array;
  
        const result = {
          males: 0,
          females: 0
        };
  
        students.forEach(student => {
          if (student) { // check if data is not null
            if (student.sex === 'Male' || student.sex === 'male'|| student.sex === 'm' || student.sex === 'M' ){
              result.males++; 
            } else if (student.sex === 'Female' || student.sex === 'female' || student.sex === 'f' || student.sex === 'F'  ) {
              result.females++;
            }
          }
        });
  
        return result;
      })
    );
  }

  getStudentsByCourse(course: string): Observable<{ [key: string]: number }> {
    return this.afs.list('students').snapshotChanges().pipe(
      map((items: any[]) => {
        const students = items.map(item => {
          const data = item.payload.val();
          if (data) { // check if data is not null
            const student = {
              studentId: this.encryptFunction.decryptData(data.studentId),
              firstname: this.encryptFunction.decryptData(data.firstname),
              middlename: this.encryptFunction.decryptData(data.middlename),
              lastname: this.encryptFunction.decryptData(data.lastname),
              course: this.encryptFunction.decryptData(data.course),
              sex: this.encryptFunction.decryptData(data.sex),
              soNumber: this.encryptFunction.decryptData(data.soNumber)
            };
            return student;
          } else {
            return null;
          }
        }).filter(item => item !== null) // remove null items from the array;
  
        const result = {
          BSEMC: 0,
          BSIT: 0, 
          BSCS: 0, 
          BSANIMATION: 0, 
          BSMAD: 0, 
          BSFD: 0,  
          BSFILM: 0, 
          BAMUSIC: 0,
          BSPSYCH: 0,
          BSACCT: 0
        };
  
        students.forEach(student => {
          if (student) { // check if data is not null
            if (student.course === 'BSEMC'  || student.course === 'Bachelor of Science in Entertainment and Multimedia Computing'  ){
              result.BSEMC++; 
            } else if (student.course === 'BSIT' || student.course === 'Bachelor of Science in Information Technology'  ) {
              result.BSIT++;
            }
            else if (student.course === 'BSCS'  || student.course === 'Bachelor of Science in Computer Science' ) {
              result.BSCS++;
            }
            else if (student.course === 'BS-ANIMATION' || student.course === 'Bachelor of Science in Animation'  ) {
              result.BSANIMATION++;
            }
            else if (student.course === 'BS-MAD' || student.course === 'Bachelor of Arts in Multimedia Arts and Design'  ) {
              result.BSMAD++;
            }
            else if (student.course === 'BSFD'  || student.course === 'Bachelor of Arts in Fashion Design and Technology' ) {
              result.BSFD++;
            }
            else if (student.course === 'BS-FILM' || student.course === 'Bachelor of Arts in Film and Visual Effects' ) {
              result.BSFILM++;
            }
            else if (student.course === 'BS-MUSIC' || student.course === 'Bachelor of Arts in Music Production and Sound Design' ) {
              result.BAMUSIC++;
            }
            else if (student.course === 'BSPSYCH' || student.course === 'Bachelor of Arts in Psychology' ) {
              result.BSPSYCH++;
            }
            else if (student.course === 'BSACCT' || student.course === 'Bachelor of Science in Accountancy' ) {
              result.BSACCT++;
            }
          }
        });
  
        return result;
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
