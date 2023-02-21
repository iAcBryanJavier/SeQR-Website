import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggingService } from 'src/app/services/logging.service';
import { Log } from 'src/app/interfaces/Logs';
// interface Country {
// 	name: string;
// 	flag: string;
// 	area: number;
// 	population: number;
// }


@Component({
  selector: 'app-change-logs',
  templateUrl: './change-logs.component.html',
  styleUrls: ['./change-logs.component.css']
})
export class ChangeLogsComponent implements OnInit {
  items!: Log[];
	listItem!: Log[];
  currentPage = 1;
  constructor(private logs: LoggingService ) { 
		this.logs.getInfoLogs().subscribe(items =>{
			
      this.items = items.reverse();
      this.listItem = this.getPageItems(this.currentPage);
    });
	}

  ngOnInit(): void {

  }
  getPageItems(page: number): Log[] {
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;
    return this.items.slice(startIndex, endIndex);
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.listItem = this.getPageItems(this.currentPage);
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.items.length / 5);
    return Array.from({length: pageCount}, (v, i) => i + 1);
  }

}
