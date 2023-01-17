import { Component, ViewChild, ElementRef } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';



@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css'],

})
export class ScanQrComponent  {
  availableDevices!: MediaDeviceInfo[];
  currentDevice!: MediaDeviceInfo | undefined;
  @ViewChild("selectedValue") selectedValue!: ElementRef;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices!: boolean;
  hasPermission!: boolean;

  qrResultString!: string;



  clearResult(): void {
    this.qrResultString = "";
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }



  onDeviceSelectChange(){
    const selected = this.selectedValue.nativeElement.value;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || undefined ;
   
  }



  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    
  }
  
}
