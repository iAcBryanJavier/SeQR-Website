import { Component, OnInit } from '@angular/core';

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
    studentList!: any [];

  ngOnInit(): void {
  }


  

constructor(private studentService: StudentCsvService) {
}



fileChangeListener(event: Event) {
  const input = event.target as HTMLInputElement;
  if(input.files){
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const jsonData = JSON.parse(reader.result as string);
      console.log(jsonData[0]);
      
        this.studentData = new Student();
        for (let i = 0;i < jsonData.length; ++i){
            
        

            this.studentData.firstName = jsonData[i].firstName;
            this.studentData.middleName = jsonData[i].middleName;
            this.studentData.lastName = jsonData[i].lastName;
            this.studentData.course = jsonData[i].studentCourse;
            this.studentData.batch = jsonData[i].studentBatch;
            this.studentData.studentId = jsonData[i].studentId;
            this.studentData.gender = jsonData[i].studentGender;
            this.studentData.diplomaNumber = jsonData[i].studentDiplomaNumber;
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


