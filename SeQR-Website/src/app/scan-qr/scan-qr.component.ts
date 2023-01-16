import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css']
})
export class ScanQrComponent implements OnInit {
  scanResult: any = '';
  scannerEnabled = false;
  constructor() { }

  ngOnInit(): void {
  }

  onCodeResult(result: string){
    this.scanResult = result;
  }

}
