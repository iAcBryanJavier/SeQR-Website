import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinataService {

  constructor(private http: HttpClient) { }

  getDataFromPinata(ipfsLink: string): Observable<any>{
    return this.http.get(ipfsLink)
  }
}
