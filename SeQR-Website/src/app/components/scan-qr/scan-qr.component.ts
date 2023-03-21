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
import { ModalPopupComponent } from 'src/app/components/modal-popup/modal-popup.component';
import { RefreshComponentService } from 'src/app/services/refresh-component.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css'],
})
export class ScanQrComponent {
  @ViewChild('selectedValue') selectedValue!: ElementRef;
  componentRoute: string = 'scan-qr';
  availableDevices!: MediaDeviceInfo[];
  currentDevice!: MediaDeviceInfo | undefined;
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  scannerStatus: boolean = false;
  showMainContent: string = 'display: none';
  buttonStyle: string = 'btn btn-success';
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
    private authService: AuthService,
    private refreshService: RefreshComponentService
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
    this.isLoadingSpinner = true;
    this.toggleScannerStatus();
    this.scannerStatus = false;
    // this.isLoading = true;
    // this.progressBarMsg = 'Loading Student Diploma...'
    try {
      const resultParsed = JSON.parse(resultString);
      this.fetchStudentDiploma(resultParsed.txnHash, resultParsed.index);
      this.progressBarMsg = 'Loading Student Diploma'
    } catch (err) {
      this.fetchStudentDiploma(resultString, -1);
      this.progressBarMsg = 'Loading Student Diploma'
    }
  }

  toggleScannerStatus(): void {
    this.scannerStatus = !this.scannerStatus;
    if(this.scannerStatus){
      this.showMainContent = 'display: block';
      this.buttonStyle = 'btn btn-danger'
      this.isLoading = false;
    }else{
      this.showMainContent = 'display: none';
      this.buttonStyle = 'btn btn-success'
    }
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
      this.refreshService.refresh(this.componentRoute);
      const ref = this.modalService.open(ModalPopupComponent);
      ref.componentInstance.message = 'We were unable to locate the student in the SeQR Database. We kindly request you to try again.';
      throw('SeQR Database Error: check qr code');
    }else{
      this.isLoadingSpinner = false;
      return true;
    }
  }

  fetchStudentDiploma(txnHash: string, index: number) {
    try {
      this.studentObservable = this.db.getStudentDiplomaFromBlockchain(
        txnHash,
        index,
        this.componentRoute
      );
      this.studentObservable.subscribe((item) => {
        this.ipfsData = item[0];
        this.isLoading = true;
      });
    } catch (err) {
      console.log(err);
    }
  }
}
