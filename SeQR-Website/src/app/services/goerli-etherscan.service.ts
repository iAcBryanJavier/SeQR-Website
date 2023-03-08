import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoerliEtherscanService {
  private BASE_URL = 'https://api-goerli.etherscan.io/api';

  constructor(private httpService: HttpClient) { }

  getTransactionByHash(txn: string): Observable<any>{
    const TRANSACTION_BY_HASH_QUERY = `?module=proxy&action=eth_getTransactionByHash&txhash=${txn}&apikey=${environment.goerli_etherscan.apiKey}`

    console.log(this.BASE_URL + TRANSACTION_BY_HASH_QUERY);
    return this.httpService.get(this.BASE_URL + TRANSACTION_BY_HASH_QUERY)
  }

}
