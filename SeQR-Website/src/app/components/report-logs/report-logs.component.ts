import { Component, OnInit } from '@angular/core';
import { FilterPipe } from 'src/app/filter.pipe';
import { Student } from 'src/app/interfaces/Student';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-report-logs',
  templateUrl: './report-logs.component.html',
  styleUrls: ['./report-logs.component.css'],
  providers: [DatabaseService]
})
export class ReportLogsComponent implements OnInit {
  items!: Student[];
  searchText: string = '';

  constructor(private dataService: DatabaseService) { 
    this.dataService.getStudent().subscribe(items =>{
      this.items = items;
    });
  }

  ngOnInit(): void {
  }
}
