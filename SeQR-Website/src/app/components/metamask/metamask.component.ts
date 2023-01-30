import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-metamask',
  templateUrl: './metamask.component.html',
  styleUrls: ['./metamask.component.css']
})
export class MetamaskComponent implements OnInit {
  title = 'ng-connect-ethereum-wallet';

  public walletConnected: boolean = false;
  public walletId: string = '';

  constructor(private walletService: Web3Service) { }

  connectToWallet  = () => {
    this.walletService.connectWallet();
  }

  checkWalletConnected = async () => {
    const accounts = await this.walletService.checkWalletConnected();
    if(accounts.length > 0){
      this.walletConnected = true;
      this.walletId = accounts[0];
    }
  }

  ngOnInit(): void {
  }

}
