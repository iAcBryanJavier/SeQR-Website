import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggingService } from 'src/app/services/logging.service';
import { Log } from 'src/app/interfaces/Logs';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Student } from 'src/app/interfaces/Student';
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
  appliedFilter = ''
  fillListItem!: Log[];
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
   this.appliedFilter = event;
   this.setPage(1);
  }

  setTableItems(list: Observable <any[]>){
		list.subscribe(items =>{

      this.items = items.reverse();
      this.fillListItem = this.items;
      this.listItem = this.getPageItems(this.currentPage);
     this.pageCount = this.getPages();
    });
  }

  exportLogsPDF() {
  
    var ctr = 0;
    const doc = new jsPDF();
    const generationDate = new Date();
    const currentUrl = window.location.href;
    var hours = generationDate.getHours();
    var minutes = generationDate.getMinutes();
    var month = (generationDate.getMonth() + 1);
    var day = generationDate.getDate();
    var year = generationDate.getUTCFullYear();
    var minute = minutes < 10 ? '0'+minutes : minutes;
    var generatedDate =  day + '/' + month + '/' + year + ' - ' + hours + ':' + minute  ;
    const appliedFilter = this.appliedFilter;
    autoTable(doc, {
      html: '#export-table',
      startY: 50, // increase startY to make more space at the top of the page
      didParseCell: function (data: any) {
   
        const row = data.row.index;
        const col = data.column.index;
        if (row === 0 && col === 0 && ctr === 0) {
          ctr++;
          // add generation date to the top of the page
          doc.text(`This report was generated from: ${currentUrl}`, data.settings.margin.left, 20);
          doc.text(`This report was generated on: ${generatedDate}`, data.settings.margin.left, 30);
          // add applied filter below the generation date
          doc.text(`The report generation filter is the following: ${appliedFilter}`, data.settings.margin.left, 40);
        }
      },
    });
    doc.save('table.pdf');
    ctr = 0;
  }
  getPageItems(page: number): Log[] {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    return this.items.slice(startIndex, endIndex);
  }
  setPageEvent(): void {
    const selected = this.selectedValue.nativeElement.value;
    var pageNumber: number = +selected;
    this.setPage(pageNumber);
    this.currentPage = pageNumber;

  }

 setPageAdd(page: number): void {
    page = page + 1;
    this.setPage(page);
}
setPageMinus(page: number): void {
  page = page - 1;
  this.setPage(page);
}


setPage(page: number): void {
  this.currentPage = page;
  this.listItem = this.getPageItems(this.currentPage);
}


  getSearch(searchQuery: string): Observable<any[]>{
    return this.logs.getSearchLogs(searchQuery);
  }

  getPages(): number {
    const pageCount = Math.ceil(this.items.length / 10);
    return pageCount;
  }
  public range(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

}





