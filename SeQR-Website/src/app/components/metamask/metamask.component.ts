import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-metamask',
  templateUrl: './metamask.component.html',
  styleUrls: ['./metamask.component.css']
})
export class MetamaskComponent implements OnInit {
  title = 'ng-connect-ethereum-wallet';

  // public walletConnected: boolean = false;
  // public walletId: string = '';
  // public walletEthBalance: any;

  public isIdentified: boolean = false;
  public ethereum: any;
  public isConnected: boolean = false;
  public ownerAddress: string = '';
  public METAMASK_KEY: string = '';

  constructor(private walletService: Web3Service) { }

  // connectToWallet = () => {
  //   this.walletService.connectWallet();
  // }

  // checkWalletConnected = async () => {
  //   const accounts = await this.walletService.checkWalletConnected();
  //   if(accounts.length > 0){
  //     this.walletConnected = true;
  //     this.walletId = accounts[0];
  //     console.log(accounts);
  //   }
  // }

  // checkBalance = async () => {
  //   const balance = await this.walletService.checkWalletBalance();
  //   this.walletEthBalance = balance;
  //   console.log(balance);
  // }

  ngOnInit(): void {
    if (this.checkIfMetamaskInstalled()) {
      this.isIdentified = true;

      // if (this.checkIfMetamaskConnected()) {
      //   this.connected();
      // }
      if (this.ethereum) {
        this.connectMetamask();
      }
    }
  }

  private checkIfMetamaskInstalled(): boolean {
    if (typeof (window as any).ethereum !== 'undefined') {
      this.ethereum = (window as any).ethereum;
      return true;
    }
    return false;
  }

  private checkIfMetamaskConnected(): boolean {
    if (localStorage.getItem(this.METAMASK_KEY)) {
      return true;
    }
    return false;
  }

  private storeMetamask() {
    localStorage.setItem(this.METAMASK_KEY, this.ownerAddress);
  }

  private connected() {
    this.isConnected = true;
  }

  public async connectMetamask() {
    const accounts = await (window as any).ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = accounts[0];
    this.ownerAddress = account;
    // this.storeMetamask();
    this.connected();
  }

}
