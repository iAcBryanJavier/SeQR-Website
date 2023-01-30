import { Injectable } from '@angular/core';
import * as Web3 from 'web3';


@Injectable({
  providedIn: 'root'
})

export class Web3Service {
  private web3: any;
  public ethereum;

constructor() {
  const {ethereum} = <any>window
    this.ethereum = ethereum
}

public connectWallet = async () => {
  try{
    if(!this.ethereum) return alert("Please install meta mask");
    const accounts = await this.ethereum.request({method: 'eth_requestAccounts'});
  }
  catch(e){
     throw new Error("No thereum object found")
  }
}

public checkWalletConnected = async () => {
  try{
    if(!this.ethereum) return alert("Please install meta mask ")
    const accounts = await this.ethereum.request({method: 'eth_accounts'});
    return accounts;
  }
  catch(e){
    throw new Error("No ethereum object found");
  }
}

}
