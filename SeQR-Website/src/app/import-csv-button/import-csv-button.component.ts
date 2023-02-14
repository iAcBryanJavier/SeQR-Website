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
        // console.log(parseCSV(reader.result as string));
        const jsonData = JSON.parse(parseCSV(reader.result as string));
        // console.log(jsonData);
        // console.log(jsonData.length);
        this.studentData = new Student();
        this.encryptionFunc = new Encryption();
        for (let i = 0; i < jsonData.length - 1; ++i) {
     
          // INSERT ENCRYPTED DATA TO MODEL HERE
          this.studentData.setName(this.encryptionFunc.encryptData(jsonData[i].firstName),
          this.encryptionFunc.encryptData(jsonData[i].middleName), 
          this.encryptionFunc.encryptData(jsonData[i].lastName));
          this.studentData.setCourse(this.encryptionFunc.encryptData(jsonData[i].studentCourse));
          this.studentData.setBatch(this.encryptionFunc.encryptData(jsonData[i].studentBatch));
          this.studentData.setId(this.encryptionFunc.encryptData(jsonData[i].studentId));
          this.studentData.setGender(this.encryptionFunc.encryptData(jsonData[i].studentGender));
          this.studentData.setDiplomaNumber(this.encryptionFunc.encryptData(jsonData[i].studentDiplomaNumber));

          console.log(this.studentData.firstname)
          this.saveStudent(this.studentData);
        
          // PUSHES MODEL TO DB
       
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

function parseCSV(csv: string): string {
  const lines = csv.split("\n");
  const headers = lines[0].split(",") as string[];
  const result: {}[] = [];
  for (let i = 1; i < lines.length; i++) {
    const obj: { [key: string]: string } = {};
    const currentLine = lines[i].split(",");
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }
    result.push(obj);
  }
  return JSON.stringify(result);
}

