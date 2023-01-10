import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css'],
  standalone: true,
	imports: [ZXingScannerModule]
})
export class ScanQrComponent  {
  scannerEnabled = false;
  
}
