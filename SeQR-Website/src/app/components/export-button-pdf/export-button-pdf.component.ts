import { Component, OnInit } from '@angular/core';
import  autotable  from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { DatabaseService } from 'src/app/services/database.service';
import { Encryption } from 'src/app/models/encryption';
import { Student } from 'src/app/interfaces/Student';

@Component({
  selector: 'app-export-button-pdf',
  templateUrl: './export-button-pdf.component.html',
  styleUrls: ['./export-button-pdf.component.css']
})
export class ExportButtonPdfComponent implements OnInit {
  items!: Student[];
  studentData!: string[];
  encryptFunction = new Encryption;
  jsonStudentData!: JSON;
private doc = new jsPDF();



  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
    this.db.getStudent().subscribe(items =>{
      for (let item of items) {

      }
      this.studentData = this.items = items;
     this.jsonStudentData = JSON.parse(JSON.stringify(this.studentData));
    });

    const headers = Object.keys(this.studentData[0]);
    const rows = this.studentData.map(obj => Object.values(obj));
    autotable(this.doc, {
      head: [headers],
      body: [rows,

      ]

    })
  }

  getStudentData(): void{
    this.doc.save();
 }



}
