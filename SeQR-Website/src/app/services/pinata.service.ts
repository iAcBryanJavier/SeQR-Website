import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import web3 from 'web3';
import { Encryption } from '../models/encryption';

@Injectable({
  providedIn: 'root',
})
export class PinataService {
  private BASE_URL = 'https://api-goerli.etherscan.io/api';
  private encryptFunction = new Encryption();
  private studentList: any;
  constructor(private http: HttpClient, private afs: AngularFireDatabase) {
    this.studentList = this.getStudent();
  }

  getDataFromPinata(ipfsLink: string): Observable<any> {
    return this.http.get(ipfsLink);
  }

  getStudent(): Observable<any[]> {
    return this.afs.list('students').snapshotChanges().pipe(
      map((items: any[]) => {
        return items.map(item => {

          const data = item.payload.val();
          if (data) { // check if data is not null
            return {
              key: item.payload.key,
              studentId: this.encryptFunction.decryptData(data.studentId),
              firstname: this.encryptFunction.decryptData(data.firstname),
              middlename: this.encryptFunction.decryptData(data.middlename),
              lastname: this.encryptFunction.decryptData(data.lastname),
              course: this.encryptFunction.decryptData(data.course),
              sex: this.encryptFunction.decryptData(data.sex),
              soNumber: this.encryptFunction.decryptData(data.soNumber),
              dataImg: data.dataImg,
              txnHash: data.txnHash
            };
          } else {
            return null;
          }
        }).filter(item => item !== null); // remove null items from the array
      })
    );
  }

  getSearchStudent(query: string): Observable<any[]> {
    return this.studentList.pipe(
      map((students: any[]) => {
        return students.filter((student: any) => {
          const values = Object.values(student);
          return values.some((value: any) => typeof value === 'string' && value.includes(query));
        });
      })
    );
  }


  getStudentDiplomaFromBlockchain(
    txnHash: string,
    index: number
  ): Observable<any> {
    const TRANSACTION_BY_HASH_QUERY = `?module=proxy&action=eth_getTransactionByHash&txhash=${txnHash}&apikey=${environment.goerli_etherscan.apiKey}`;
    if (index == -1) {
      return this.http.get(this.BASE_URL + TRANSACTION_BY_HASH_QUERY).pipe(
        switchMap((item: any) => {
          let ipfsLink;
          try {
            ipfsLink = web3.utils.hexToAscii(item.result.input).slice(68, 231);
          } catch (err) {
            ipfsLink = '';
          }
          return this.http.get(ipfsLink.toString()).pipe(
            switchMap((user: any) => {
              return this.getSearchStudent(this.encryptFunction.decryptData(user.studentId));

            })
          );
        })
      );
    } else {
      return this.http.get(this.BASE_URL + TRANSACTION_BY_HASH_QUERY).pipe(
        switchMap((item: any) => {
          let ipfsLink;
          try {
            ipfsLink = web3.utils.hexToAscii(item.result.input).slice(68, 148);
          } catch (err) {
            ipfsLink = '';
          }
          return this.http.get(ipfsLink.toString()).pipe(
            switchMap((user: any) => {
              return this.getSearchStudent(this.encryptFunction.decryptData(user.studentId));

            })
          );
        })
      );
    }
  }
}
