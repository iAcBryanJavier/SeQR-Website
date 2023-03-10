import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { MetamaskService } from 'src/app/services/metamask.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{

  public isIdentified: boolean = false;
  public ethereum: any;
 
  public ownerAddress: string = '';
  isMenuCollapsed = true;

  constructor(private router: Router, private authService: AuthService, private MetamaskService: MetamaskService) {}

  ngOnInit(): void {
    if (this.MetamaskService.checkIfMetamaskInstalled()) {
      this.isIdentified = true;
      if (this.ethereum) {
      
      }
    }else{

    }
  }


  getConnectionStatus(){
    return this.MetamaskService.getConnectedStatus();
  }

  navbarConnectMetamask(){
    this.MetamaskService.connectMetamask();
  }



  logout(){
    this.authService.logout();
  }
}
