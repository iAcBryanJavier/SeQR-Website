import { Component, OnInit } from '@angular/core';
 
import { Encryption } from '../models/encryption';
import { StudentCsvService } from '../services/student-csv.service';
import { Student } from '../models/student';


@Component({
  selector: 'import-csv-button',
  templateUrl: './import-csv-button.component.html',
  styleUrls: ['./import-csv-button.component.css']
})
export class ImportCsvButtonComponent implements OnInit {
  
   
    fileInput!: object;
    
    studentData!: Student;
    encryptionFunc!: Encryption;
    studentList!: any [];

  ngOnInit(): void {
  }


  

constructor(private studentService: StudentCsvService) {
}



fileChangeListener(event: Event) {
  const input = event.target as HTMLInputElement;
  if(input.files){ // CHECKS IF FILES IS NULL
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => { // GETS CALLED WHEN THE FILE IS READ
      const jsonData = JSON.parse(reader.result as string);
    
      
        this.studentData = new Student();
        this.encryptionFunc = new Encryption();
        for (let i = 0;i < jsonData.length; ++i){
   
     // INSERT ENCRYPTED DATA TO MODEL HERE
          this.studentData.firstName = this.encryptionFunc.encryptData(jsonData[i].firstName);
          this.studentData.middleName = this.encryptionFunc.encryptData(jsonData[i].middleName);
          this.studentData.lastName = this.encryptionFunc.encryptData(jsonData[i].lastName);
          this.studentData.course = this.encryptionFunc.encryptData(jsonData[i].studentCourse);
          this.studentData.batch = this.encryptionFunc.encryptData(jsonData[i].studentBatch);
          this.studentData.studentId = this.encryptionFunc.encryptData(jsonData[i].studentId.toString());
          this.studentData.gender = jsonData[i].studentGender;
          this.studentData.diplomaNumber = this.encryptionFunc.encryptData(jsonData[i].studentDiplomaNumber.toString());

          
          // TEST CODES
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].firstName));
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].middleName));
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].lastName));
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].studentCourse));
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].studentBatch));
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].studentId.toString()));
          // this.encryptionFunc.decryptData(this.encryptionFunc.encryptData(jsonData[i].studentDiplomaNumber.toString()));

          // PUSHES MODEL TO DB
         this.saveStudent(this.studentData);
  
          
    }
      

    };
  } else {
    console.error("No file selected");
  }
  
  }


  

    saveStudent(studentInformation: Student): void{
  
      this.studentService.create(studentInformation).then(() =>{
        console.log('Created new item successfully!');
    });

    }


}


