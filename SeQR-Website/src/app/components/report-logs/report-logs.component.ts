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
  currentPage = 0;
  pageSize = 5; // changeit to 10
  totalPages!: number;
  numberOfPages !: number;
  downloadQR !:  ""

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
    this.totalPages = Math.ceil(this.items.length / this.pageSize);
  }

  itemsToShow() {
    this.numberOfPages = Math.ceil(this.items.length / this.pageSize);
    return this.items.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.numberOfPages - 1) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
