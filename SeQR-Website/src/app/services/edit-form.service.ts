import { Injectable } from '@angular/core';
import { Student } from '../interfaces/Student';
import { DatabaseService } from './database.service';


@Injectable({
  providedIn: 'root'
})
export class EditFormService {
  private studentData!: Student;
  private coursesData!: any;
  constructor(private db: DatabaseService) { }

  setStudentData(data: Student) {
    this.studentData = data;
  }
  getStudentData() {
    console.log(this.studentData);
    return this.studentData;
  }


  setCoursesData(courses: any) {
    this.coursesData = courses;
  }
  getCourseData() {
    return this.coursesData;
  }


}
