import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  readonly METAMASK_KEY: string = 'metamask';

  public ethereum: any;
  public isConnected: boolean = false;
  public ownerAddress: string = '';
  constructor() { }

  checkIfMetamaskInstalled(): boolean {
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

  private disconnected() {
    this.isConnected = false;
  }

  getConnectedStatus() {
    return this.isConnected;
  }
  setConnectedStatusTrue() {
    this.connected();
  }
  setConnectedStatusFalse() {
    this.disconnected();
  }

  public async connectMetamask() {
    try {
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = accounts[0];
      this.ownerAddress = account;
      this.storeMetamask();
      this.connected();
    } catch (error) {
      // Handle the error here, for example:
      throw "Metamask Error: Might be a Metamask Authentication error. More Info " + error;
      // ...or you can re-throw the error to let the calling function handle it
    }
  }

  public async checkConnectionMetamask(): Promise<boolean> {
    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",// wait up to 1 second for a response
      });

      // if accounts is an empty array, the user is not connected
      if (accounts.length > 0) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    } catch (error) {
      console.error(error);
      return Promise.resolve(false);
    }
  }

}
