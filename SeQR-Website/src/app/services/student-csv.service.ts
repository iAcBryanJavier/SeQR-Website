import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Student } from '../models/student';
@Injectable({
    providedIn: 'root'
  })

  export class StudentCsvService{
    private dbPath = '/student-test';
    tutorialsRef: AngularFireList<Student>;

   
    constructor(private db:AngularFireDatabase ) {
        this.tutorialsRef = db.list(this.dbPath);
      }

      getDbPath(): string{
        return this.dbPath;
      }
      getAll(): AngularFireList<Student> {
        return this.tutorialsRef;
      }
    
      create(student: Student): any {
        return this.tutorialsRef.push(student);
      }
    
      update(key: string, value: any): Promise<void> {
        return this.tutorialsRef.update(key, value);
      }
    
      delete(key: string): Promise<void> {
        return this.tutorialsRef.remove(key);
      }
    
      deleteAll(): Promise<void> {
        return this.tutorialsRef.remove();
      }
  }