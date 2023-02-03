import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Eth } from 'web3-eth';


@Injectable({
  providedIn: 'root'
})

export class Web3Service {
  public ethereum;
  web3 = new Web3(new Web3.providers.HttpProvider('<API endpoint>'));

  constructor() {
    const { ethereum } = <any>window
    this.ethereum = ethereum
  }

  public connectWallet = async () => {
    try {
      if (!this.ethereum) return alert("Please install meta mask");
      await this.ethereum.request({ method: 'eth_requestAccounts' });
      location.reload();
    }
    catch (e) {
      throw new Error("No ethereum object found")
    }
  }

  public checkWalletConnected = async () => {
    try {
      if (!this.ethereum) return alert("Please install meta mask ")
      const accounts = await this.ethereum.request({ method: 'eth_accounts' });
      return accounts;
    }
    catch (e) {
      throw new Error("No ethereum object found");
    }
  }

  public checkWalletBalance = async () => {
    try {
      if (!this.ethereum) return alert("Please install metamask");
      const accounts = await this.ethereum.request({ method: 'eth_accounts' });
      const balance = await this.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest']
      });

      const ethBalance = (parseInt(balance, 16) / 10 ** 8);

      return ethBalance / 10 ** 10;
    } catch (e) {
      throw new Error("No ethereum object found");
    }
  }
  // public connectToEthNetwork(){
  //   this.ethereum.enable().then((accounts) => {
  //     // Your code here
  //   });
  // }

}
