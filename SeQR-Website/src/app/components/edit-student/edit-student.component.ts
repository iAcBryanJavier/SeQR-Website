import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/app/interfaces/Student';
import { DatabaseService } from 'src/app/services/database.service';
import { Encryption } from 'src/app/models/encryption';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  @ViewChild("selectedValue") selectedValue!: ElementRef;
  searchQuery: string = '';
  items!: Student[];
	listItem!: Student[];
  currentPage = 1;
  pageCount!: number;
  pageCounting!: number;
  next_button = "Next";
  decryptedStudentList!: Observable <any[]>;
  encryptFunction = new Encryption();
  constructor(private students: DatabaseService ) { 
        this.students.setStudentList();
        this.setTableItems(this.students.getStudent());
		// this.students.getStudent().subscribe(items =>{
    //   for (let item of items) {
    //     item.studentId = this.encryptFunction.decryptData(item.studentId);
    //     item.firstname = this.encryptFunction.decryptData(item.firstname);
    //     item.middlename = this.encryptFunction.decryptData(item.middlename);
    //     item.lastname = this.encryptFunction.decryptData(item.lastname);
    //     item.course = this.encryptFunction.decryptData(item.course);
    //     item.sex = this.encryptFunction.decryptData(item.sex);
    //     item.soNumber = this.encryptFunction.decryptData(item.soNumber);
    //   }
    //   this.items = items.reverse();
    //   this.listItem = this.getPageItems(this.currentPage);
    //  this.pageCount = this.getPages();
    // });
	}

  ngOnInit(): void {

  }



  onSearchInputChange(event: any) {
   this.setTableItems((this.getSearch(event)));
   this.setPage(1);
  }


  setTableItems(list: Observable <any[]>){
		list.subscribe(items =>{
			
      this.items = items.reverse();
      this.listItem = this.getPageItems(this.currentPage);
     this.pageCount = this.getPages();
    });
  }

  getPageItems(page: number): Student[] {
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

  getSearch(searchQuery: string): Observable <any[]>{
 
    return this.students.getSearchStudent(searchQuery);
  
  }

  getPages(): number {
    const pageCount = Math.ceil(this.items.length / 5);
  
    console.log(pageCount);
    return pageCount;
  }
  public range(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
}
