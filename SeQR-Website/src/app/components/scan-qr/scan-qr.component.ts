import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BarcodeFormat } from '@zxing/library';
import { DatabaseService } from 'src/app/services/database.service';
import { GoerliEtherscanService } from 'src/app/services/goerli-etherscan.service';
import { DiplomaTemplateComponent } from '../diploma-template/diploma-template.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IpfsStudent } from 'src/app/interfaces/IpfsStudent';
import { Observable } from 'rxjs';
import { ModalPopupComponent } from 'src/app/modal-popup/modal-popup.component';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css'],
})
export class ScanQrComponent {
  @ViewChild('selectedValue') selectedValue!: ElementRef;
  availableDevices!: MediaDeviceInfo[];
  currentDevice!: MediaDeviceInfo | undefined;
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  scannerStatus: boolean = true;
  hasDevices!: boolean;
  hasPermission!: boolean;
  qrResultString!: string;
  isLoading: boolean = false;
  isLoadingSpinner: boolean = false;
  progressBarMsg: string = '';
  ipfsData: IpfsStudent = {
    studentId: '',
    soNumber: '',
    lastname: '',
    middlename: '',
    firstname: '',
    course: '',
  };
  studentObservable!: Observable<any>;

  idUserEmail: string | null = localStorage.getItem('idUserEmail');

  isLoggedIn!: boolean;

  constructor(
    private db: DatabaseService,
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthService
  ) {
    this.isLoggedIn = authService.checkLogin();
  }

  ngOnInit(): void {
    this.db.setStudentList();
  }

  clearResult(): void {
    this.qrResultString = '';
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.toggleScannerStatus();
    this.scannerStatus = false;
    // this.isLoading = true;
    // this.progressBarMsg = 'Loading Student Diploma...'
    try {
      const resultParsed = JSON.parse(resultString);
      this.fetchStudentDiploma(resultParsed.txnHash, resultParsed.index);
      this.isLoading = true;
      this.progressBarMsg = 'Loading Student Diploma'
    } catch (err) {
      this.fetchStudentDiploma(resultString, -1);
      this.isLoading = true;
    }
  }

  toggleScannerStatus(): void {
    this.scannerStatus = !this.scannerStatus;
  }

  onDeviceSelectChange() {
    const selected = this.selectedValue.nativeElement.value;
    const device = this.availableDevices.find((x) => x.deviceId === selected);
    this.currentDevice = device || undefined;
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

  isUndefined(ipfsData: any): boolean{
    if(ipfsData == undefined){
      this.refresh();
      const ref = this.modalService.open(ModalPopupComponent);
      ref.componentInstance.message = 'We were unable to locate the student in the SeQR Database. We kindly request you to try again.';
      throw('SeQR Database Error: check qr code');
    }else{
      return true;
    }
  }

  refresh() {
    this.router.navigate(['/'], { skipLocationChange: true }).then(() => {
      this.router.navigate(['scan-qr']);
    });
  }

  fetchStudentDiploma(txnHash: string, index: number) {
    try {
      this.studentObservable = this.db.getStudentDiplomaFromBlockchain(
        txnHash,
        index
      );
      this.studentObservable.subscribe((item) => {
        this.ipfsData = item[0];
      });
    } catch (err) {
      console.log(err);
    }
  }
}
