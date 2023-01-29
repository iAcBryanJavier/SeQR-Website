import { Component, OnInit } from '@angular/core';
import { FilterPipe } from 'src/app/filter.pipe';
import { Student } from 'src/app/interfaces/Student';
import { Encryption } from 'src/app/models/encryption';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-report-logs',
  templateUrl: './report-logs.component.html',
  styleUrls: ['./report-logs.component.css'],
  providers: [DatabaseService]
})
export class ReportLogsComponent implements OnInit {
  items!: Student[];
  encryptFunction = new Encryption;
  searchText: string = '';

  constructor(private dataService: DatabaseService) { 
    this.dataService.getStudent().subscribe(items =>{
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
      this.items = items;
    });
  }

  ngOnInit(): void {
  }
}
