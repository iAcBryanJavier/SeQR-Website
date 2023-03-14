import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/app/interfaces/Student';
import { DatabaseService } from 'src/app/services/database.service';
import { Encryption } from 'src/app/models/encryption';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { EditFormService } from 'src/app/services/edit-form.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
viewTxcClick(txnHash: string|null) {
 window.open('https://goerli.etherscan.io/tx/' + txnHash);
}
  @ViewChild('selectedValue') selectedValue!: ElementRef;
  courses!: any;
  searchQuery: string = '';
  items!: Student[];
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
      // console.log("THIS", this.passedCourse);
    });
  }

  ngOnInit(): void {}

  onSearchInputChange(event: any) {
    this.setTableItems(this.getSearch(event));
    this.setPage(1);
  }

  setTableItems(list: Observable<any[]>) {
    list.subscribe((items) => {
      this.items = items.reverse();
      this.listItem = this.getPageItems(this.currentPage);
      this.pageCount = this.getPages();
    });
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