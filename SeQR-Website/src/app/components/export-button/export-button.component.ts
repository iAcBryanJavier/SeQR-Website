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
  jsonStudentData!: JSON;
  constructor(private db: DatabaseService) {
  }

  ngOnInit(): void {
    this.db.getStudent().subscribe(items =>{
      this.studentData = this.items = items;
      this.jsonStudentData = JSON.parse(JSON.stringify(this.studentData));
    });
  }

 getStudentData(): void{
    this.exportCsv(this.jsonStudentData);
 }

 exportCsv(data_to_export: JSON) {
  this.downloadFile(data_to_export);
}
downloadFile(data: any, filename = 'data') {
  let arrHeader =  ["course", "firstname", "lastname", "middlename", "sex", "soNumber", "studentId", "schoolYear", "term", "txnHash"];
  let csvData = this.ConvertToCSV(data, arrHeader);
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
  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  let row = 'no,';

  let newHeaders = ["course", "firstname", "lastname", "middlename", "sex", "soNumber", "studentId", "schoolYear", "term", "txnHash"];

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
