import { Component, OnInit } from '@angular/core';

import { Encryption } from '../models/encryption';
import { StudentCsvService } from '../services/student-csv.service';
import { Student } from '../interfaces/Student';
import { DatabaseService } from '../services/database.service';
import PinataClient, { PinataPinOptions } from '@pinata/sdk';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'import-csv-button',
  templateUrl: './import-csv-button.component.html',
  styleUrls: ['./import-csv-button.component.css']
})
export class ImportCsvButtonComponent implements OnInit {


  fileInput!: object;

  studentData!: Student;
  encryptionFunc!: Encryption;
  studentList: Student[] = [];

  public pinata = new PinataClient(environment.pinatacloud.apiKey, environment.pinatacloud.apiSecret);

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
        
        let studentDataList: Student[];
        this.encryptionFunc = new Encryption();
        
        console.log(parseCSV(reader.result as string));

        for (let i = 0; i < jsonData.length - 1; ++i) {
          //  INSERT ENCRYPTED DATA TO MODEL HERE
          this.studentData = {
            firstname: this.encryptionFunc.encryptData(jsonData[i].firstName),
            middlename: this.encryptionFunc.encryptData(jsonData[i].middleName),
            lastname: this.encryptionFunc.encryptData(jsonData[i].lastName),
            course: this.encryptionFunc.encryptData(jsonData[i].studentCourse),
            studentId: this.encryptionFunc.encryptData(jsonData[i].studentId),
            sex: this.encryptionFunc.encryptData(jsonData[i].studentGender),
            soNumber: this.encryptionFunc.encryptData(jsonData[i].studentDiplomaNumber),
            txnHash: 'txnHash test',
            dataImg: 'dataImg test'
          }

          // this.studentData.setName(this.encryptionFunc.encryptData(jsonData[i].firstName),
          // this.encryptionFunc.encryptData(jsonData[i].middleName), 
          // this.encryptionFunc.encryptData(jsonData[i].lastName));
          // this.studentData.setCourse(this.encryptionFunc.encryptData(jsonData[i].studentCourse));
          // this.studentData.setId(this.encryptionFunc.encryptData(jsonData[i].studentId));
          // this.studentData.setGender(this.encryptionFunc.encryptData(jsonData[i].studentGender));
          // this.studentData.setDiplomaNumber(this.encryptionFunc.encryptData(jsonData[i].studentDiplomaNumber));
          // this.studentData.setTxnHash('txnHash test');
          // this.studentData.setDataImg('dataImg test');

          // studentDataList.push(this.studentData);
          console.log(this.studentData.firstname);
          this.studentList.push(this.studentData);
          this.saveStudent(this.studentData);
          //  PUSHES MODEL TO DB
        }
        
        console.log(JSON.stringify(this.studentList));

      };

    } else {
      console.error("No file selected");
    }
  }

  saveStudent(studentInformation: Student): void {
    this.db.addStudent(studentInformation);
  }

  async uploadToIPFS(studentData: string): Promise<string>{
    let responseValue: string = '';
    const options: PinataPinOptions = {
      pinataMetadata: {
        name: 'Student Data',
      },
    };
    await this.pinata.pinJSONToIPFS(studentData, options).then((result) => {
      //handle results here
      responseValue = result.IpfsHash;
    }).catch((err) => {
      //handle error here
      responseValue = 'failed';
      console.log(err);
    });
    return responseValue;
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