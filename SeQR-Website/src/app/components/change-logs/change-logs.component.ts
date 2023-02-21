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

  constructor(private logs: LoggingService ) { 
		this.logs.getInfoLogs().subscribe(items =>{
			
      this.items = items;
			console.log(this.items);
    });
	}

  ngOnInit(): void {

  }

	 
}
