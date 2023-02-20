import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable()
export class LoggingService {
  level: LogLevel = LogLevel.All;

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

  private writeToLog(
    msg: string,
    rawdata: Error,
    level: LogLevel,
    params: any[]
  ) {
    if (this.shouldLog(level)) {
      let value: Ilogger = {} as Ilogger;

      value.LogDate = JSON.stringify(new Date());
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

  getAllLogs() {
    return this.afs.list("logging").snapshotChanges();
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

