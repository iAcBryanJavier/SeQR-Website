import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
@Component({
  selector: 'import-csv-button',
  templateUrl: './import-csv-button.component.html',
  styleUrls: ['./import-csv-button.component.css']
})
export class ImportCsvButtonComponent implements OnInit {
  csvRecords!: any[] | NgxCSVParserError;
  header: boolean = true;


  ngOnInit(): void {
  }


  constructor(private ngxCsvParser: NgxCsvParser) {
  }
  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
  
    this.ngxCsvParser
        .parse(files[0], {
            header: this.header,
            delimiter: ',',
            encoding: 'utf8'
        })
        .pipe()
        .subscribe(
            (result) => {
                console.log('Result', result);
                this.csvRecords = result;
            },
            (error: NgxCSVParserError) => {
                console.log('Error', error);
            }
        );
        
}

}
