import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild("selectedValue") selectedValue!: ElementRef;
  searchQuery: string = '';
  items!: Log[];
	listItem!: Log[];
  currentPage = 1;
  pageCount!: number;
  pageCounting!: number;
  next_button = "Next";
  logList!: Observable<any[]>
  constructor(private logs: LoggingService ) { 
    this.logs.setLogHistory();
    this.logList = this.logs.getInfoLogs();
    this.setTableItems(this.logList);
    
	}

  ngOnInit(): void {

  }
  onInput(event: any) {
    if (event.target.value.length > 0) {
  
    }
  }

  onSearchInputChange(event: any) {
   this.setTableItems(this.getSearch(event));
   this.setPage(1);
  }

  setTableItems(list: Observable <any[]>){
		list.subscribe(items =>{
			
      this.items = items.reverse();
      this.listItem = this.getPageItems(this.currentPage);
     this.pageCount = this.getPages();
    });
  }
  getPageItems(page: number): Log[] {
    const startIndex = (page - 1) * 5;
    const endIndex = startIndex + 5;
    return this.items.slice(startIndex, endIndex);
  }
  setPageEvent(): void {
    const selected = this.selectedValue.nativeElement.value;
    this.setPage(selected);
    
  }


  setPage(page: number): void {
    this.currentPage = page;
    this.listItem = this.getPageItems(this.currentPage);
  }

  getSearch(searchQuery: string): Observable<any[]>{
    return this.logs.getSearchLogs(searchQuery);
  }

  getPages(): number {
    const pageCount = Math.ceil(this.items.length / 5);
  
    console.log(pageCount);
    // if(this.currentPage == pageCount){
    //   this.next_button = "";
    // }else{

    // }
    return pageCount;
  }
  public range(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

}



