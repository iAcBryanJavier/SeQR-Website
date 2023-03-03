import { Component, OnInit } from '@angular/core';
import { Log } from '../interfaces/Logs';
import { LoggingService } from '../services/logging.service';


@Component({
  selector: 'app-export-button-change-logs',
  templateUrl: './export-button-change-logs.component.html',
  styleUrls: ['./export-button-change-logs.component.css']
})
export class ExportButtonChangeLogsComponent implements OnInit {
  items!: Log[];
  logsData!: string[];

  constructor(private logs: LoggingService) { 
  }

  ngOnInit(): void {
  }

  getInfoData(): void{
    this.logs.getInfoLogs().subscribe(items => {
      this.items = items;
      var jsonLogsData = JSON.parse(JSON.stringify(this.items));
      console.log(jsonLogsData);
      console.log("STUDENT ARRAY: ", this.items, "\n JSON DATA: ", jsonLogsData);
    
      this.logsData = jsonLogsData;
      this.exportCsv(this.logsData);
    });
  }
  

  exportCsv(data_to_export: any[]) {
    this.downloadFile(data_to_export);
  }

  downloadFile(data: any[], filename = 'data') {
    let arrHeader = ["LogDate", "LogLevel", "Message"];
    let csvData = this.ConvertToCSV(data, arrHeader);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", "export_data.csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: any[], headerList: any[]) {
    let str = '';
    let row = 'no,';

    let newHeaders = ["Time/Date", "Type", "Message"];

    for (let index in newHeaders) {
      row += newHeaders[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < objArray.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + this.strRep(objArray[i][head]);
      }
      str += line + '\r\n';
    }
    return str;
  }

  strRep(data: any) {
    if(typeof data == "string") {
      let newData = data.replace(/,/g, " ");
      return newData;
    }
    else if(typeof data == "undefined") {
      return "-";
    }
    else if(typeof data == "number") {
      return data.toString();
    }
    else {
      return data;
    }
  }
}
