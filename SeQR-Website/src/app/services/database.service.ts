import { Injectable } from '@angular/core';

import { Student } from '../interfaces/Student';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';

import { Observable } from 'rxjs';
import PinataClient, { PinataPinOptions } from '@pinata/sdk';
import { environment } from 'src/environments/environment';
import { ethers } from 'ethers';
import contract from '../../../src/app/contracts/Student.json';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  student!: AngularFireObject<Student>;
  private blobDataUrl: any;
  private pinata = new PinataClient(environment.pinatacloud.apiKey, environment.pinatacloud.apiSecret);
  private ethereum: any;
  private readonly CONTRACT_ADDRESS: string = '0x8594bc603F61635Ef94D17Cc2502cb5bcdE6AF0a';
  private contractABI = contract.abi;
  private ipfsUrlPrefix: string  = "https://ipfs.io/ipfs/";
  
  constructor(private afs: AngularFireDatabase, private http: HttpClient) { }

  //add student
  addStudent(student: any){
    const ref = this.afs.list('students');
    ref.push(student).then(()=>{
      window.alert('Student added to database!');
    }).catch(() =>{
      window.alert('An error occured, please try again.');
    });
  }

  getStudent(): Observable<any[]>{
    return this.afs.list('students').valueChanges();
  }

  getCourses(): Observable<any[]> {
    return this.afs.list('courses').valueChanges();
  }
}
