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
import { interval, Observable } from 'rxjs';
import FileSaver, { saveAs } from 'file-saver';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPopupComponent } from 'src/app/modal-popup/modal-popup.component';
import { MetamaskService } from 'src/app/services/metamask.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  public ipfsUrlPrefix: string  = environment.pinatacloud.gateway;
  public ipfsQuery: string = environment.pinatacloud.gatewayTokenQuery + environment.pinatacloud.gatewayToken;
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
  public students:  any = [];
  public filename: string = "";
  public blobUrl!: Blob;
  public isDuplicate: any;
  readonly CONTRACT_ADDRESS: string = '0x8594bc603F61635Ef94D17Cc2502cb5bcdE6AF0a';
  public contractABI = contract.abi;
  public nfts: any = [];
  public courses: any = [];
  public pinata = new PinataClient(environment.pinatacloud.apiKey, environment.pinatacloud.apiSecret);
  encryptFunction = new Encryption();
  public progressBarValue: number = 0;
  public progressBarMsg: string = "";
  public spaceship: boolean = false;

  // form group for add stduent form to db
  studentForm = new FormGroup({
    firstname: new FormControl('', Validators.compose([Validators.required, this.noSpacesValidator])),
    middlename: new FormControl(''),
    lastname: new FormControl('', Validators.compose([Validators.required, this.noSpacesValidator])),
    course: new FormControl('', Validators.compose([Validators.required, this.noSpacesValidator])),
    studentId: new FormControl('', Validators.compose([Validators.required, this.noSpacesValidator])),
    sex: new FormControl('', Validators.compose([Validators.required, this.noSpacesValidator])),
    soNumber: new FormControl('', Validators.required),
    dataImg: new FormControl(''),
    txnHash: new FormControl('')
  })

  // NEED TO IMPORT DOM SANITZER
  constructor(private db: DatabaseService, private sanitizer: DomSanitizer
    , private modalService: NgbModal, private MetamaskService: MetamaskService) {}


  onChangeURL(url?: SafeUrl, content?: any) {
    if (this.myAngularxQrCode != "") {
       // progress bar checkpoint
       this.progressBarMsg = "Minting Complete! Creating QR Code.";
       this.progressBarValue = 100;

      // Opens the modal and puts the qr code inside the content
      this.modalService.open(content, { size: 'xl' });
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
    }
  }

  noSpacesValidator(control: FormControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value || /^\s+$/.test(value)) { // check if value is empty or just whitespace
      
      return {'blankSpaces': true};
    }
    return null;
  }



  ngOnInit(): void {
    this.MetamaskService.checkIfMetamaskInstalled();
    // this.fetchNFTs();

    this.db.getCourses().subscribe(i => {
      this.courses = i;
      // console.log(this.courses);
    });

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


  async onSubmit(content: any) {
    const metamaskConnection = await this.MetamaskService.checkConnectionMetamask().then((res: any) => {
      this.ethereum = (window as any).ethereum;
      return res;
    })

    // console.log(metamaskConnection);

    if (metamaskConnection) {


      this.isMinting = true;

      this.progressBarMsg = "Checking for Duplicate Records";
      this.progressBarValue = 25;

      interval(1000);
      const dupeCounter = await this.db.checkAddDuplicate(
        this.studentForm.controls['studentId'].value!.trim(),
        this.studentForm.controls['course'].value!.trim(),
        this.studentForm.controls['soNumber'].value!.trim(),
        this.studentForm.controls['firstname'].value!.trim(),
        this.studentForm.controls['middlename'].value!.trim(),
        this.studentForm.controls['lastname'].value!.trim(),
        this.studentForm.controls['sex'].value
        
      ).then((res: any) => {
        return res;
      });

      console.log(this.studentForm.controls['soNumber'])
      if (this.studentForm.valid && dupeCounter.dupeCount < 1) {

        // progress bar checkpoint
        this.progressBarMsg = "Uploading Files to IPFS";
        this.progressBarValue = 50;

        const ipfsHash = await this.uploadToIPFS(
          this.encryptFunction.encryptData(this.studentForm.controls['studentId'].value?.trim()),
          this.encryptFunction.encryptData(this.studentForm.controls['soNumber'].value?.trim()))
          .then((res) => {
            return res;
          });

        // progress bar checkpoint
        this.progressBarMsg = "Creating Blockchain Transaction";
        this.progressBarValue = 75;

        this.txnHash = await this.createTransaction(ipfsHash)
          .then((res) => {
            return res;
          })

        this.hasSubmit = true;

        // if(this.studentForm.controls['studentId'].value && this.txnHash){
        //   this.filename = this.studentForm.controls['studentId'].value;
        //   this.myAngularxQrCode = this.txnHash;
        // }

        this.studentForm.setValue({
          studentId: this.encryptFunction.encryptData(this.studentForm.controls['studentId'].value?.trim()),
          firstname: this.encryptFunction.encryptData(this.studentForm.controls['firstname'].value?.trim()),
          middlename: this.encryptFunction.encryptData(this.studentForm.controls['middlename'].value?.trim()),
          lastname: this.encryptFunction.encryptData(this.studentForm.controls['lastname'].value?.trim()),
          course: this.encryptFunction.encryptData(this.studentForm.controls['course'].value?.trim()),
          sex: this.encryptFunction.encryptData(this.studentForm.controls['sex'].value?.trim()),
          soNumber: this.encryptFunction.encryptData(this.studentForm.controls['soNumber'].value?.trim()),
          dataImg: `qr-codes/${this.studentForm.controls['studentId'].value}.png`,
          txnHash: this.txnHash
        })

        this.db.addStudent(this.studentForm.value);
        this.studentForm.reset();
        this.hasSubmit = false;
        this.progressBarValue = 0;
        this.progressBarMsg = '';
      } else {

        const modalRef = this.modalService.open(ModalPopupComponent);


          modalRef.componentInstance.message = dupeCounter.dupeMessage + "Please check your inpput fields.";
          this.isMinting = false;
          this.progressBarMsg = "";
          this.progressBarValue = 0;

       
        // this.studentForm.reset();
        this.hasSubmit = false;
        this.progressBarMsg = '';
        this.progressBarValue = 0;
      }
    } else {
      const modalRef = this.modalService.open(ModalPopupComponent);
      modalRef.componentInstance.message = "No Metamask connection found!";
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
    }
  }

  receiveIsMinting(data: any){
    console.log(data)
    this.isMinting = data;
  }

  receiveProgressBarValue(data: any){
    this.progressBarValue = data;
  }

  receiverProgressBarMsg(data: any){
    this.progressBarMsg = data;
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
