import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Student } from 'src/app/interfaces/Student';
import { Encryption } from 'src/app/models/encryption';
import csvDownload from 'json-to-csv-export'


@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.css']
})
export class ExportButtonComponent implements OnInit {
  items!: Student[];
  studentData!: string[];
  encryptFunction = new Encryption;
 

 


  constructor(private db: DatabaseService) { 

  }

  ngOnInit(): void {
  }

 getStudentData(): void{
  this.db.getStudent().subscribe(items =>{
    for (let item of items) {
      item.studentId = this.encryptFunction.decryptData(item.studentId);
      item.firstname = this.encryptFunction.decryptData(item.firstname);
      item.middlename = this.encryptFunction.decryptData(item.middlename);
      item.lastname = this.encryptFunction.decryptData(item.lastname);
      item.course = this.encryptFunction.decryptData(item.course);
      item.batch = this.encryptFunction.decryptData(item.batch);
      item.sex = this.encryptFunction.decryptData(item.sex);
      item.soNumber = this.encryptFunction.decryptData(item.soNumber);
    }
    this.studentData = this.items = items;
    var jsonStudentData: JSON = JSON.parse(JSON.stringify(this.studentData));
    console.log("STUDENT ARRAY: ", this.studentData, "\n JSON DATA: ", jsonStudentData);
 
  
    this.exportCsv(jsonStudentData);
  });


 }

 exportCsv(data_to_export: JSON) {
  this.downloadFile(data_to_export);
}
downloadFile(data: any, filename = 'data') {
  let arrHeader =  ["batch", "course", "firstname", "lastname", "middlename", "sex", "soNumber", "studentId"];
  let csvData = this.ConvertToCSV(data, arrHeader);
  console.log(csvData)
  let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
  let dwldLink = document.createElement("a");
  let url = URL.createObjectURL(blob);
  let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
  if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
    dwldLink.setAttribute("target", "_blank");
  }
  dwldLink.setAttribute("href", url);
  dwldLink.setAttribute("download", "export_data.csv");
  dwldLink.style.visibility = "hidden";
  document.body.appendChild(dwldLink);
  dwldLink.click();
  document.body.removeChild(dwldLink);
}

ConvertToCSV(objArray: any, headerList: any) {
  console.log(objArray);

  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  let row = 'no,';

  let newHeaders = ["batch", "course", "firstname", "lastname", "middlename", "sex", "soNumber", "studentId"];

  for (let index in newHeaders) {
    row += newHeaders[index] + ',';
  }
  row = row.slice(0, -1);
  str += row + '\r\n';
  for (let i = 0; i < array.length; i++) {
    let line = (i + 1) + '';
    for (let index in headerList) {
      let head = headerList[index];

      line += ',' + this.strRep(array[i][head]);
    }
    str += line + '\r\n';
  }
  return str;
}

strRep(data: any) {
  if(typeof data == "string") {
    let newData = data.replace(/,/g, " ");
     return newData;
  }
  else if(typeof data == "undefined") {
    return "-";
  }
  else if(typeof data == "number") {
    return  data.toString();
  }
  else {
    return data;
  }
}
 
}