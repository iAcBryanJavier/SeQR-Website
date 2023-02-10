import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
  readonly METAMASK_KEY: string = 'metamask';

  public isIdentified: boolean = false;
  public ethereum: any;
  public isConnected: boolean = false;
  public ownerAddress: string = '';
  isMenuCollapsed = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.checkIfMetamaskInstalled()) {
      this.isIdentified = true;
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
    this.storeMetamask();
    this.connected();
  }

  logout(){
    this.authService.logout();
  }
}
