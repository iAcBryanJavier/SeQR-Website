import { Component, ViewChild } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { GoerliEtherscanService } from '../services/goerli-etherscan.service';
import web3 from 'web3';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'read-qr-component',
  templateUrl: './read-qr-component.component.html',
  styleUrls: ['./read-qr-component.component.css']
})
export class ReadQrComponentComponent  {
  // declare GetQrData: string;
  result!: any;
  url: string|null|ArrayBuffer = '';
  ipfsLink: string = '';
  txnHash: string = '';
  ipfsIndex!: number;
  isLoading: boolean = false;
  progressBarMsg: string = '';
  progressBarValue: number = 0;

  constructor(private goerli_http: GoerliEtherscanService, private modalService: NgbModal) {
    // this.myScriptElement = document.createElement("script");
    // this.myScriptElement.src = "https://unpkg.com/@zxing/library@latest";
    // document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void { }

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
        } catch (error) {
          this.txnHash = result.toString();
          this.ipfsIndex = -1;
        }
      })
      .catch((err) => {
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
    this.isLoading = true;
    this.progressBarValue = 15
    this.progressBarMsg = 'Processing QR Code Image'

    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    // if(file){
    //   const fs = require('fs').promise;
    //   var fileLoc = './assets/img/' + file.name;
    //   fs.writeFile(fileLoc, reader.readAsDataURL(file))
    // }

    reader.onload = (event:Event) => {
      let fileReader = event.target as FileReader
      this.url = fileReader.result;
      console.log(file);
      this.decodeOrCode();
    }
  }

  receiveLoadingValue(loadingValue: any){
    this.isLoading = loadingValue;
  }

  receiveProgressBarMsg(msg: any){
    this.progressBarMsg = msg;
  }

  receiveProgressBarValue(progressBarValue: any){
    this.progressBarValue = progressBarValue;
  }
}





