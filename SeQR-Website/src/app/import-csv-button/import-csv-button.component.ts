import { Component, EventEmitter, OnInit, Output, SecurityContext } from '@angular/core';

import { Encryption } from '../models/encryption';
import { StudentCsvService } from '../services/student-csv.service';
import { Student } from '../interfaces/Student';
import { DatabaseService } from '../services/database.service';
import PinataClient, { PinataPinOptions } from '@pinata/sdk';
import { environment } from 'src/environments/environment';
import { ethers } from 'ethers';
import contract from '../contracts/Student.json';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import FileSaver, { saveAs } from 'file-saver';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { TxnObject } from '../models/txn-object';
import JSZip, { file } from 'jszip';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'import-csv-button',
  templateUrl: './import-csv-button.component.html',
  styleUrls: ['./import-csv-button.component.css']
})

export class ImportCsvButtonComponent implements OnInit {
  @Output() isMintingEvent = new EventEmitter<boolean>();
  @Output() progressBarValueEvent = new EventEmitter<number>();
  @Output() progressBarMsgEvent = new EventEmitter<string>();

  fileInput!: object;

  studentData!: Student;
  encryptionFunc!: Encryption;
  studentList: Student[] = [];

  public pinata = new PinataClient(environment.pinatacloud.apiKey, environment.pinatacloud.apiSecret);
  public ethereum: any;
  public isMinting: boolean = false;
  readonly CONTRACT_ADDRESS: string = '0x8594bc603F61635Ef94D17Cc2502cb5bcdE6AF0a';
  public contractABI = contract.abi;
  public ipfsUrlPrefix: string = environment.pinatacloud.gateway;
  public ipfsQuery: string = environment.pinatacloud.gatewayTokenQuery + environment.pinatacloud.gatewayToken;
  public myAngularxQrCode: string = "";
  qrCodeDownloadLink: SafeUrl = "";
  filename: string = "";
  dataUrl!: string;
  txnObjList: string[] = [];
  jsonData!: any[];
  changeUrlCtr: number = 0;
  txnHash: any;
  progressBarValue: number = 0;
  progressBarMsg: string = '';

  blobUrls: Blob[] = [];

  ngOnInit(): void {
    this.checkIfMetamaskInstalled();
  }

  constructor(private modalService: NgbModal,private studentService: StudentCsvService, private db: DatabaseService, private sanitizer: DomSanitizer) { }

  onChangeURL(url?: SafeUrl, index?: number) {
    if (this.txnObjList.length != 0 && this.changeUrlCtr < this.txnObjList.length) {
      console.log(url);
      if (url) {
        // Changes whenever this.myAngularxQrCode changes
        this.qrCodeDownloadLink = url;
        // Converts SafeURL to URL of type string
        const validUrl = this.sanitizer.sanitize(SecurityContext.URL, this.qrCodeDownloadLink);
        if (validUrl) {
          // fetch converts the URL of type string to a Blob URL
          fetch(validUrl)
            .then(response => response.blob())
            .then(blobData => {
              // FileSaver automatically downloads the QR Code on submit
              saveAs(blobData, `${this.encryptionFunc.decryptData(this.studentList[index ?? 0].studentId)}.png`);
              // Upload files to Firebase Storage
              const storage = getStorage();
              const storageRef = ref(storage, `qr-codes/${this.encryptionFunc.decryptData(this.studentList[index ?? 0].studentId)}.png`);
              uploadBytes(storageRef, blobData).then((snapshot) => {
                console.log(snapshot);
              })
            });
            this.changeUrlCtr++

            if(this.changeUrlCtr == this.txnObjList.length){
              // progress bar checkpoint
              this.progressBarMsg = "Minting Complete! Creating QR Code.";
              this.progressBarValue = 100;
              this.progressBarMsgEvent.emit(this.progressBarMsg);
              this.progressBarValueEvent.emit(this.progressBarValue);
              return;
            }
        }
      }
      //produces BLOB URI/URL, browser locally stored data
      console.log(this.qrCodeDownloadLink);
    }
  }

  // async downloadZip(){
  //   let index = 0;
  //   const zip = new JSZip();
  //   console.log(this.blobUrls)
  //   this.blobUrls.forEach(item =>{
  //     fetch(item.toString())
  //       .then(response => response.blob())
  //       .then( blob => {
  //         zip.file(`test${index}.png`, blob, {binary: true});
  //       })
  //     index++;
  //   });

  //   zip.generateAsync({type: 'blob'})
  //   .then(content =>{
  //     saveAs(content, `${this.txnHash}.zip`);
  //   })
  // }

  fileChangeListener(event: Event) {
    this.txnObjList.forEach(() =>{
      this.txnObjList.pop()
    })
    const input = event.target as HTMLInputElement;
    if (input.files) { // CHECKS IF FILES IS NULL
      this.isMinting = true;
      console.log(this.isMinting)
      this.isMintingEvent.emit(this.isMinting);

      this.changeUrlCtr = 0;
      console.log(this.txnObjList.length)
      console.log(this.changeUrlCtr);
      const file = input.files[0]
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async () => { // GETS CALLED WHEN THE FILE IS READ
        const jsonData = JSON.parse(parseCSV(reader.result as string));
        this.encryptionFunc = new Encryption();
        console.log(parseCSV(reader.result as string));

        for (let i = 0; i < jsonData.length - 1; ++i) {


          // if (Object.values(jsonData[i]).every((val) => val === "")) {
          //   continue; // Skip this row if it's completely empty
          // }
          const dupeCounter = await this.db.checkAddDuplicate(
            jsonData[i].studentId,
            jsonData[i].course,
           jsonData[i].soNumber
           ).then((res: any) => {
             return res;
           });
       
          console.log(dupeCounter.dupeCount);
          if(dupeCounter.dupeCount < 1){
            console.log(jsonData[i].studentId);
            this.studentData = {
              firstname: this.encryptionFunc.encryptData(jsonData[i].firstname),
              middlename: this.encryptionFunc.encryptData(jsonData[i].middlename),
              lastname: this.encryptionFunc.encryptData(jsonData[i].lastname),
              course: this.encryptionFunc.encryptData(jsonData[i].course),
              studentId: this.encryptionFunc.encryptData(jsonData[i].studentId),
              sex: this.encryptionFunc.encryptData(jsonData[i].sex),
              soNumber: this.encryptionFunc.encryptData(jsonData[i].soNumber),
              txnHash: '',
              dataImg: ''
            }
  
            this.studentList.push(this.studentData);
          }else{
            continue;
          }
          }
       
        if(this.studentList.length < 1){
          const modalRef = this.modalService.open(ModalPopupComponent);
          modalRef.componentInstance.message = 'No students were added, please check the CSV file you uploaded for errors.';
          this.isMinting = false;
          this.isMintingEvent.emit(this.isMinting);
          
        }else{
          console.log(JSON.stringify(this.studentList));
          let ctr = 0;
  
           // progress bar checkpoint
          this.progressBarMsg = "Uploading Files to IPFS";
          this.progressBarValue = 50;
          this.progressBarMsgEvent.emit(this.progressBarMsg);
          this.progressBarValueEvent.emit(this.progressBarValue);
  
          const ipfsHash = await this.uploadToIPFS(this.studentList);
  
          // progress bar checkpoint
          this.progressBarMsg = "Creating Blockchain Transaction";
          this.progressBarValue = 75;
          this.progressBarMsgEvent.emit(this.progressBarMsg);
          this.progressBarValueEvent.emit(this.progressBarValue);
  
          this.txnHash = await this.createTransaction(ipfsHash);
  
          if(this.txnHash){
            this.studentList.forEach(item =>{
              const txnObj = new TxnObject();
              txnObj.setTxnHash(this.txnHash);
              txnObj.setIndex(ctr);
              this.txnObjList.push(JSON.stringify(txnObj));
  
              item.txnHash = JSON.stringify(txnObj);
              item.dataImg = `qr-codes/${this.encryptionFunc.decryptData(item.studentId)}.png`;
              this.saveStudent(item);
              ctr++;
           })
              this.isMinting = false;
              this.isMintingEvent.emit(this.isMinting);
            if(ctr > 0){
              const modalRef = this.modalService.open(ModalPopupComponent);
              modalRef.componentInstance.message = 'Added student record(s)!';
              this.isMinting = false;
              this.isMintingEvent.emit(this.isMinting);
            }else{
              const modalRef = this.modalService.open(ModalPopupComponent);
              modalRef.componentInstance.message = 'Added student record(s)! Some students were skipped due to being a duplicate';
              this.isMinting = false;
              this.isMintingEvent.emit(this.isMinting);
            }
            
          }
        };
        }
      
    } else {
      console.error("No file selected");
    }
  }

  saveStudent(studentInformation: Student): void {
    this.db.addBatchStudent(studentInformation);
  }

  private checkIfMetamaskInstalled(): boolean {
    if (typeof (window as any).ethereum !== 'undefined') {
      this.ethereum = (window as any).ethereum;
      return true;
    }
    return false;
  }

  async uploadToIPFS(studentData: any): Promise<string>{
    let responseValue: string = '';
    let bodyList: {}[] = [];

    this.studentList.forEach(item =>{
      const body = {
        studentId: '',
        soNumber: ''
      };

      body.studentId = item.studentId ?? 'no value';
      body.soNumber = item.soNumber ?? 'no value';
      bodyList.push(body)
    })

    const options: PinataPinOptions = {
      pinataMetadata: {
        name: 'Student Data',
      },
    };
    await this.pinata.pinJSONToIPFS(bodyList, options).then((result) => {
      //handle results here
      responseValue = result.IpfsHash;
    }).catch((err) => {
      //handle error here
      responseValue = 'failed';
      console.log(err);
    });
    return responseValue;
  }

  async createTransaction(ipfsHash: any): Promise<any>{
    if (!this.ethereum) {
      console.error('Ethereum object is required');
      return;
    }


    const provider = new ethers.providers.Web3Provider(this.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(this.CONTRACT_ADDRESS, this.contractABI, signer);

    try{
      const createTxn = await contract['create']((this.ipfsUrlPrefix + ipfsHash + this.ipfsQuery));

      console.log('Create transaction started...', createTxn.hash);
      await createTxn.wait();
      console.log('Created student record!', createTxn.hash);

      return createTxn.hash;
    }catch(err: any){
      console.error(err.message);
      window.alert('Minting Failed' + err.message);
      this.myAngularxQrCode = "";
      this.isMinting = false;
      this.isMintingEvent.emit(this.isMinting);
    }
  }
}

function parseCSV(csv: string): string {
  const lines = csv.split("\n");
  const headers = lines[0].split(",") as string[];
  const result: {}[] = [];
  for (let i = 1; i < lines.length; i++) {
    const obj: { [key: string]: string } = {};
    const currentLine = lines[i].split(",");
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }
    result.push(obj);
  }
  return JSON.stringify(result);
}
