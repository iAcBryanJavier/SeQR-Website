import { ApplicationModule, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/app/interfaces/Student';
import { DatabaseService } from 'src/app/services/database.service';
import { Encryption } from 'src/app/models/encryption';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { EditFormService } from 'src/app/services/edit-form.service';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf'
import { LoggingService } from 'src/app/services/logging.service';
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {

  @ViewChild('selectedValue') selectedValue!: ElementRef;
  courses!: any;
  searchQuery: string = '';
  items!: Student[];
  fillListItem!: Student[];
  generationDate = new Date();
  appliedFilter: string = '';
  listItem!: Student[];
  currentPage = 1;
  pageCount!: number;
  pageCounting!: number;
  next_button = 'Next';
  decryptedStudentList!: Observable<any[]>;
  encryptFunction = new Encryption();
  constructor(
    private students: DatabaseService,
    private router: Router,
    private route: ActivatedRoute,
    private formService: EditFormService
  ) {
    this.students.setStudentList();
    this.setTableItems(this.students.getStudent());

    this.students.getCourses().subscribe((i) => {
      this.courses = i;
    });

    
  }

  ngOnInit(): void {}

  exportStudentPDF() {
  
    var ctr = 0;
    const doc = new jsPDF();
    const generationDate = new Date();
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
          doc.text(`This report was generated on: ${generatedDate}`, data.settings.margin.left, 30);
          // add applied filter below the generation date
          doc.text(`The report generation filter is the following: ${appliedFilter}`, data.settings.margin.left, 40);
        }
      },
    });
    doc.save('table.pdf');
    ctr = 0;
  }
  
  


  viewTxcClick(txnHash: string | null) {
    window.open('https://goerli.etherscan.io/tx/' + txnHash);
  }

  onSearchInputChange(event: any) {
    this.appliedFilter = event;
    this.setTableItems(this.getSearch(event));
    this.setPage(1);
  }

  setTableItems(list: Observable<any[]>) {
    list.subscribe((items) => {
      this.items = items.reverse();
      this.fillListItem = this.items;
      this.listItem = this.getPageItems(this.currentPage);
      this.pageCount = this.getPages();
    });
  }

  setInvisibleTableItems(list:Observable<any>){

  }

  getPageItems(page: number): Student[] {
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

  onEditClick(student: Student) {
    this.formService.setStudentData(student);
    this.formService.setCoursesData(this.courses);
    this.router.navigate(['/edit-form']);
  }

  onDeleteClick(student: Student['key']) {
    this.students.deleteStudentRecord(student);
  }

  getSearch(searchQuery: string): Observable<any[]> {
    return this.students.getSearchStudent(searchQuery);
  }

  getPages(): number {
    const pageCount = Math.ceil(this.items.length / 10);
    return pageCount;
  }
  public range(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
}
