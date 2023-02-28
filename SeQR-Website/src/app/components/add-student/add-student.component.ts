import { Component, Inject, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Encryption } from 'src/app/models/encryption';
import { DatabaseService } from 'src/app/services/database.service';
import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { getBootstrapBaseClassPlacement } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { ethers } from 'ethers';
import contract from '../../contracts/Student.json';
import PinataClient, { PinataPinOptions, PinataPinResponse } from '@pinata/sdk';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import FileSaver, { saveAs } from 'file-saver';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  public ipfsUrlPrefix: string  = "https://gateway.pinata.cloud/ipfs/";
  public ipfsHash: any;
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  public sanitizedUrl!: string | null;
  public blobDataUrl: any;
  public ethereum: any;
  public hasSubmit: boolean = false;
  public isMinting: boolean = false;
  public txnHash: any;
  public qrCodeURL: any;
  public dataImg: any;
  public filename: string = "";
  public blobUrl!: Blob;

  readonly CONTRACT_ADDRESS: string = '0x8594bc603F61635Ef94D17Cc2502cb5bcdE6AF0a';
  public contractABI = contract.abi;
  public nfts: any = [];
  public courses: any = [];
  public pinata = new PinataClient(environment.pinatacloud.apiKey, environment.pinatacloud.apiSecret);

  // form group for add stduent form to db
  studentForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    middlename: new FormControl(''),
    lastname: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    studentId: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    soNumber: new FormControl('', Validators.required),
    dataImg: new FormControl(''),
    txnHash: new FormControl('')
  })

  // NEED TO IMPORT DOM SANITZER
  constructor(private db: DatabaseService, private sanitizer: DomSanitizer ) {}

  onChangeURL(url?: SafeUrl) {
    if (this.myAngularxQrCode != "") {
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
              FileSaver.saveAs(validUrl, `${this.filename}.png`);
              // Upload files to Firebase Storage
              const storage = getStorage();
              const storageRef = ref(storage, `qr-codes/${this.filename}.png`);
              uploadBytes(storageRef, blobData).then((snapshot) => {
                console.log(snapshot);
              })
            });
        }
      }
      //produces BLOB URI/URL, browser locally stored data
      console.log(this.qrCodeDownloadLink);
    }
    // TODO: remove this method
    this.getBase64Img();
  }

  encryptFunction = new Encryption();

  ngOnInit(): void {
    this.checkIfMetamaskInstalled();
    // this.fetchNFTs();

    this.db.getCourses().subscribe(i => {
      this.courses = i;
      console.log(this.courses);
    });
  }

  getBase64Img() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    var dataImg;

    const validUrl = this.sanitizer.sanitize(SecurityContext.URL, this.qrCodeDownloadLink);
    if (validUrl) {
      xhr.open('GET', validUrl);
      xhr.send();
    }

    xhr.onload = function () {
      const recoveredBlob = xhr.response;
      const reader = new FileReader();

      reader.onload = function () {
        var blobAsDataUrl = reader.result;
        console.log(reader.result)
        console.log(blobAsDataUrl) // this is the final image
      };

      reader.readAsDataURL(recoveredBlob);
    };

    this.dataImg = dataImg;
    console.log(this.dataImg);
  }


  private checkIfMetamaskInstalled(): boolean {
    if (typeof (window as any).ethereum !== 'undefined') {
      this.ethereum = (window as any).ethereum;
      return true;
    }
    return false;
  }

  async pinFileToPinata(studentIdData: any, soNumberData: any) {
    var responseValue;
    const body = {
      studentId: studentIdData,
      qrCode: this.blobDataUrl,
      soNumber: soNumberData
    };
    const options: PinataPinOptions = {
      pinataMetadata: {
        name: 'Student Data',
      },
    };

    this.pinata.pinJSONToIPFS(body, options).then((result) => {
      //handle results here
     this.createTransaction(result.IpfsHash);

  }).catch((err) => {
      throw "Pinata pinJSONtoIPFS Failed";
      responseValue = 'failed';
  });
  }

  async onSubmit() {
    if (this.studentForm.valid) {
      //encryption of data

      //add to firebase realtime database
      // this.db.addStudent(this.studentForm.value);
      // this.createTransaction();
      // this.pinFileToPinata(this.encryptFunction.encryptData(this.studentForm.controls['studentId'].value), this.encryptFunction.encryptData(this.studentForm.controls['soNumber'].value))
      const ipfsHash = await this.uploadToIPFS(
        this.encryptFunction.encryptData(this.studentForm.controls['studentId'].value),
        this.encryptFunction.encryptData(this.studentForm.controls['soNumber'].value))
        .then((res) => {
          return res;
        });

      const txnHash = await this.createTransaction(ipfsHash)
        .then((res) => {
          return res;
        })

      this.hasSubmit = true;

      if(this.studentForm.controls['studentId'].value && txnHash){
        this.filename = this.studentForm.controls['studentId'].value;
        this.myAngularxQrCode = txnHash;
      }

      this.studentForm.setValue({
        studentId: this.encryptFunction.encryptData(this.studentForm.controls['studentId'].value),
        firstname: this.encryptFunction.encryptData(this.studentForm.controls['firstname'].value),
        middlename: this.encryptFunction.encryptData(this.studentForm.controls['middlename'].value),
        lastname: this.encryptFunction.encryptData(this.studentForm.controls['lastname'].value),
        course: this.encryptFunction.encryptData(this.studentForm.controls['course'].value),
        sex: this.encryptFunction.encryptData(this.studentForm.controls['sex'].value),
        soNumber: this.encryptFunction.encryptData(this.studentForm.controls['soNumber'].value),
        dataImg: `qr-codes/${this.studentForm.controls['studentId'].value}.png`,
        txnHash: txnHash
      })

      this.db.addStudent(this.studentForm.value);
      this.studentForm.reset();
      this.hasSubmit = false;
    }
  }

  async uploadToIPFS(studentIdData: string, soNumberData: string): Promise<string>{
    let responseValue: string = '';
    const body = {
      studentId: studentIdData,
      qrCode: this.blobDataUrl,
      soNumber: soNumberData
    };
    const options: PinataPinOptions = {
      pinataMetadata: {
        name: 'Student Data',
      },
    };
    await this.pinata.pinJSONToIPFS(body, options).then((result) => {
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

    this.isMinting = true;
    const provider = new ethers.providers.Web3Provider(this.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(this.CONTRACT_ADDRESS, this.contractABI, signer);

    try{
      const createTxn = await contract['create']((this.ipfsUrlPrefix + ipfsHash));

      console.log('Create transaction started...', createTxn.hash);
      await createTxn.wait();
      console.log('Created student record!', createTxn.hash);
      window.alert('Created student record! ' + createTxn.hash);
      this.isMinting = false;

      return createTxn.hash;
    }catch(err: any){
      console.error(err.message);
      window.alert('Minting Failed' + err.message);
      this.myAngularxQrCode = "";
      this.isMinting = false;
    }
  }

  // private async fetchNFTs(): Promise<any> {
  //   const provider = new ethers.providers.Web3Provider(this.ethereum);
  //   const signer = provider.getSigner();
  //   const studentContract = new ethers.Contract(
  //     this.CONTRACT_ADDRESS,
  //     this.contractABI,
  //     signer
  //   );

  //   const students = await studentContract['getStudents']();
  //   console.log('Retrieved student...', students);
  //   this.nfts = students;
  // }
}
