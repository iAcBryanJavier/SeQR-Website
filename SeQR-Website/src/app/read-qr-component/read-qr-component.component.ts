import { Component, ViewChild } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { GoerliEtherscanService } from '../services/goerli-etherscan.service';
import web3 from 'web3';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from "src/app/services/auth.service";
import { DatabaseService } from '../services/database.service';
import { IpfsStudent } from '../interfaces/IpfsStudent';
import { Router } from '@angular/router';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { DiplomaTemplateComponent } from '../components/diploma-template/diploma-template.component';
import { RefreshComponentService } from '../services/refresh-component.service';


@Component({
  selector: 'app-read-qr',
  templateUrl: './read-qr-component.component.html',
  styleUrls: ['./read-qr-component.component.css']
})
export class ReadQrComponentComponent  {
  // declare GetQrData: string;
  @ViewChild('content') content!: any;
  componentRoute: string = 'read-qr';
  result!: any;
  url: string|null|ArrayBuffer = '';
  idUserEmail: string | null = localStorage.getItem("idUserEmail");
  ipfsLink: string = '';
  txnHash: string = '';
  ipfsIndex!: number;
  isDiplomaLoading: boolean = false;
  isLoadingSpinner: boolean = false;
  progressBarMsg: string = '';
  progressBarValue: number = 0;
  ipfsData: IpfsStudent = {
    firstname: '',
    middlename: '',
    lastname: '',
    studentId: '',
    soNumber: '',
    course: ''
  };
  isLoggedIn!: boolean;

  constructor(private modalService: NgbModal, private db: DatabaseService, private router: Router, private refreshService: RefreshComponentService) {

    // this.isLoggedIn  = authService.checkLogin();
    // this.myScriptElement = document.createElement("script");
    // this.myScriptElement.src = "https://unpkg.com/@zxing/library@latest";
    // document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    this.db.setStudentList();
   }

  decodeOrCode(): void {
    this.progressBarMsg = 'Loading Student Diploma'
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .decodeFromImageElement("img")
      .then(result => {
        console.log(result);
        try {
          const resultParsed = JSON.parse(result.toString());
          console.log(typeof resultParsed);
          this.txnHash = resultParsed.txnHash;
          this.ipfsIndex = resultParsed.index;

          this.db.getStudentDiplomaFromBlockchain(this.txnHash, this.ipfsIndex, this.componentRoute).subscribe(item =>{
              this.ipfsData = item[0];
              this.isDiplomaLoading = true;
            })
        } catch (error) {
          this.txnHash = result.toString();
          this.ipfsIndex = -1;

          this.db.getStudentDiplomaFromBlockchain(this.txnHash, this.ipfsIndex, this.componentRoute).subscribe(item =>{
              this.ipfsData = item[0];
              this.isDiplomaLoading = true;
            })
        }
      })
      .catch((err) => {
        const ref = this.modalService.open(ModalPopupComponent);
        ref.componentInstance.message = 'Upload QR Error: Invalid QR Upload, Check if the image is a proper image file or a proper QR Code';
        this.refreshService.refresh(this.componentRoute);
        throw (
          "Upload QR Error: Invalid QR Upload, Check if the image is a proper image file or a proper QR Code. More Info: " +
          err
        );
      });

    // import('../../assets/js/decode-script.js').then(async randomFile => {
    //   randomFile.GetQrData();
    //   this.result = randomFile.resultOfQR;
    //   alert(this.result);
    // });
  }

  processFile(imageInput: any) {
    this.url = '';
    this.isDiplomaLoading = false;
    this.isLoadingSpinner = true;
    try {
      const file: File = imageInput.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event:Event) => {
        let fileReader = event.target as FileReader
        this.url = fileReader.result;
        console.log(file);
        this.decodeOrCode();
      }
    } catch (error) {
      this.refreshService.refresh(this.componentRoute);
      throw('Reader Error: ' + error);
    }
  }

  receiveLoadingValue(loadingValue: any){
    this.isDiplomaLoading = loadingValue;
  }

  receiveProgressBarMsg(msg: any){
    this.progressBarMsg = msg;
  }

  receiveProgressBarValue(progressBarValue: any){
    this.progressBarValue = progressBarValue;
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
}





