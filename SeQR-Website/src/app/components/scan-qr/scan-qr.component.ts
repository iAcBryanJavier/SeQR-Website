import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BarcodeFormat } from '@zxing/library';
import { DatabaseService } from 'src/app/services/database.service';
import { GoerliEtherscanService } from 'src/app/services/goerli-etherscan.service';
import { DiplomaTemplateComponent } from '../diploma-template/diploma-template.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css'],

})
export class ScanQrComponent  {
  @ViewChild("selectedValue") selectedValue!: ElementRef;
  availableDevices!: MediaDeviceInfo[];
  currentDevice!: MediaDeviceInfo | undefined;
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];
  hasDevices!: boolean;
  hasPermission!: boolean;
  qrResultString!: string;
  isLoading: boolean = false;
  progressBarMsg: string = '';

  constructor(private db: DatabaseService, private modalService: NgbModal, private router: Router){}

  clearResult(): void {
    this.qrResultString = "";
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    // this.isLoading = true;
    // this.progressBarMsg = 'Loading Student Diploma...'
    try{
      const resultParsed = JSON.parse(resultString);
      this.fetchStudentDiploma(resultParsed.txnHash, resultParsed.index);
    }catch(err){
      this.fetchStudentDiploma(resultString, -1);
    }

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

  refresh(){
    this.router.navigate(['/'], { skipLocationChange: true }).then(() => {
      this.router.navigate(['read-qr']);
    });
  }

  fetchStudentDiploma(txnHash: string, index: number){
    try{
      this.db.getStudentDiplomaFromBlockchain(txnHash, index).subscribe(item =>{
        // this.progressBarMsg = 'Displaying Student Diploma...'
        console.log(item);
        const modalRef = this.modalService.open(DiplomaTemplateComponent, { size: 'xl' });
        modalRef.componentInstance.ipfsData = item[0];
      })
    }catch(err){
      alert(`Error Occured: ${err}` )
    }
  }
}
