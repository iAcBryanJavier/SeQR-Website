import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-scan-qr',
    templateUrl: './scan-qr.component.html',
    styleUrls: ['./scan-qr.component.css'],
})
export class ScanQrComponent  {
  scannerEnabled = false;
  
}
