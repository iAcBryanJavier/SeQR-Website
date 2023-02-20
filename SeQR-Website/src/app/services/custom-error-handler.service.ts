import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';


@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService extends ErrorHandler {

    constructor(private logger: LoggingService) {
        console.log("it works!");
        super();
    }

    override handleError(error: any): void {
        // Here you can provide whatever logging you want
        console.log("custom handler was called.");
        this.logger.error(error);
        super.handleError(error);
    }
}
