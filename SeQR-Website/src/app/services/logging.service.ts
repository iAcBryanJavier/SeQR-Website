import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingService {
  level: LogLevel = LogLevel.All;
  historyLogs!: Observable<SnapshotAction<unknown>[]>;

  constructor(private afs: AngularFireDatabase){}


  debug(msg: string, rawdata?: any, ...optionalParams: any[]) {
    this.writeToLog(msg, rawdata, LogLevel.Debug, optionalParams);
  }

  info(msg: string, rawdata?: any, ...optionalParams: any[]) {
    this.writeToLog(msg, rawdata, LogLevel.Info, optionalParams);
  }

  warn(msg: string, rawdata?: any, ...optionalParams: any[]) {
    this.writeToLog(msg, rawdata, LogLevel.Warn, optionalParams);
  }

  error(msg: string, rawdata?: any, ...optionalParams: any[]) {
    this.writeToLog(msg, rawdata, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, rawdata: any, ...optionalParams: any[]) {
    this.writeToLog(msg, rawdata, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, rawdata?: any, ...optionalParams: any[]) {
    this.writeToLog(msg, rawdata, LogLevel.All, optionalParams);
  }

  setlogLevel(level: LogLevel) {
    this.level = level;
  }


  formatAMPM(date: Date): string {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var month = (date.getMonth() + 1);
    var day = date.getDate();
    var year = date.getUTCFullYear();
    var minute = minutes < 10 ? '0'+minutes : minutes;
    var strTime =  day + '/' + month + '/' + year + ' - ' + hours + ':' + minute  ;
    return strTime;
  }

  private writeToLog(
    msg: string,
    rawdata: Error,
    level: LogLevel,
    params: any[]
  ) {
    if (this.shouldLog(level)) {
      let value: Ilogger = {} as Ilogger;

      value.LogDate = this.formatAMPM(new Date);
      value.LogLevel = LogLevel[level];
      value.Message = msg;
      if (rawdata) {
        value.RawData = rawdata.stack;
      }
      if (params.length) {
        value.OptionalParams = JSON.stringify(params).toString();
      }

      if (environment.logging.isfirebase) {
        this.LogToFireBase(value);
      }

      // Log the value

    }
  }

  private shouldLog(level: LogLevel): boolean {
    let ret: boolean = false;
    if (
      (level >= this.level && level !== LogLevel.Off) ||
      this.level === LogLevel.All
    ) {
      ret = true;
    }
    return ret;
  }


  private LogToFireBase(val: Ilogger) {
    this.afs.list("logging").push({ ...val });
  }

  getAllLogs(): Observable<any[]> {
    return this.afs.list("logging").valueChanges();
  }

  setLogHistory(){
    this.historyLogs = this.afs.list("logging").snapshotChanges();
  }
  getInfoLogs(): Observable<any[]> {
    return this.historyLogs.pipe(
      map((logs: any[]) =>
        logs
          .filter(log => log.payload.exists())
          .map(log => ({ id: log.payload.key, ...log.payload.val() }))
          .filter(log => log.LogLevel !== "Error")
      )
    );
  }

  getSearchLogs(query: string): Observable<any[]> {
    return this.historyLogs.pipe(
      map((logs: any[]) =>
        logs
          .filter(log => log.payload.exists())
          .map(log => ({ id: log.payload.key, ...log.payload.val() }))
          .filter(log => {
            const values = Object.values(log);
            return values.some(value => typeof value === 'string' && value.includes(query) &&  log.LogLevel !=="Error");
          })
      )
    );
  }
}

export interface Ilogger {
  loggerId: string;
  LogDate: string;
  LogLevel: string;
  Message: string;
  OptionalParams: any;
  RawData: any;
}

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6,
}

