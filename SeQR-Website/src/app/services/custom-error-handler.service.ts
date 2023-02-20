import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {

    constructor(private logger: LoggingService) {  
    }

     handleError(error: any): void {
        // Here you can provide whatever logging you want
      if(environment.logging.dblogging){
        this.logger.error(error.message);
      }else{
        throw error;
      }
      
    }
}
