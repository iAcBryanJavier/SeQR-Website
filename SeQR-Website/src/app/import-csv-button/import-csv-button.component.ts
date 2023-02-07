import { Component, OnInit } from '@angular/core';

import { Encryption } from '../models/encryption';
import { StudentCsvService } from '../services/student-csv.service';
import { Student } from '../models/student';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'import-csv-button',
  templateUrl: './import-csv-button.component.html',
  styleUrls: ['./import-csv-button.component.css']
})
export class ImportCsvButtonComponent implements OnInit {


  fileInput!: object;

  studentData!: Student;
  encryptionFunc!: Encryption;
  studentList!: any[];

  ngOnInit(): void {
  }

  constructor(private studentService: StudentCsvService, private db: DatabaseService) { }

  fileChangeListener(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) { // CHECKS IF FILES IS NULL
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => { // GETS CALLED WHEN THE FILE IS READ
        const jsonData = JSON.parse(reader.result as string);
        console.log(jsonData);
        console.log(jsonData.length);
        this.studentData = new Student();
        this.encryptionFunc = new Encryption();
        for (let i = 0; i < jsonData.length; ++i) {
          for (let j = 0; j < jsonData[i].length; ++j) {
          // INSERT ENCRYPTED DATA TO MODEL HERE
          this.studentData.setName(this.encryptionFunc.encryptData(jsonData[i][j].firstName),
          this.encryptionFunc.encryptData(jsonData[i][j].middleName), 
          this.encryptionFunc.encryptData(jsonData[i][j].lastName));
          this.studentData.setCourse(this.encryptionFunc.encryptData(jsonData[i][j].studentCourse));
          this.studentData.setBatch(this.encryptionFunc.encryptData(jsonData[i][j].studentBatch));
          this.studentData.setId(this.encryptionFunc.encryptData(jsonData[i][j].studentId));
          this.studentData.setGender(this.encryptionFunc.encryptData(jsonData[i][j].studentGender));
          this.studentData.setDiplomaNumber(this.encryptionFunc.encryptData(jsonData[i][j].studentDiplomaNumber));

          // TEST CODES
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].firstName));
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].middleName));
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].lastName));
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].studentCourse));
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].studentBatch));
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].studentId.toString()));
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].studentDiplomaNumber.toString()));
        }
          // PUSHES MODEL TO DB
          this.saveStudent(this.studentData);
        }
      };
    } else {
      console.error("No file selected");
    }
  }
  saveStudent(studentInformation: Student): void {
    this.db.addStudent(studentInformation);
  }
}


