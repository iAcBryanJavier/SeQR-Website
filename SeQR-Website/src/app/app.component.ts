import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoggingService, LogLevel } from './services/logging.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SeQR-Website';

//   constructor(private logger: LoggingService){}

// ngOnInit(){
//   this.logger.level = LogLevel[environment.logging.loglevel];
// }
}
