import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Encryption } from 'src/app/models/encryption';
import { DatabaseService } from 'src/app/services/database.service';
import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { getBootstrapBaseClassPlacement } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { ethers } from 'ethers';
import contract from '../contracts/Student.json';
import PinataClient, { PinataPinOptions, PinataPinResponse } from '@pinata/sdk';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import FileSaver, { saveAs } from 'file-saver';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { Student } from '../interfaces/Student';
import { EditFormService } from '../services/edit-form.service';
import { MetamaskService } from '../services/metamask.service';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit {
  femaleRadioButton!: HTMLInputElement;
  maleRadioButton!: HTMLInputElement;
  dupSoNumber!: any;
  dupStudentId!: any;
  dupStudentCourse!: any;

  passedCourse!: any;
  passedStudent!: Student;
  public ipfsUrlPrefix: string = environment.pinatacloud.gateway;
  public ipfsQuery: string =
    environment.pinatacloud.gatewayTokenQuery +
    environment.pinatacloud.gatewayToken;
  public ipfsHash: any;
  public myAngularxQrCode: string = '';
  public qrCodeDownloadLink: SafeUrl = '';
  public sanitizedUrl!: string | null;
  public blobDataUrl: any;
  public ethereum: any;
  public hasSubmit: boolean = false;
  public isMinting: boolean = false;
  public progressMsg: string = '';
  public txnHash: any;
  public qrCodeURL: any;
  public dataImg: any;
  public filename: string = '';
  public blobUrl!: Blob;
  public setSex!: any;

  readonly CONTRACT_ADDRESS: string =
    '0x8594bc603F61635Ef94D17Cc2502cb5bcdE6AF0a';
  public contractABI = contract.abi;
  public nfts: any = [];
  public courses!: string[];
  public pinata = new PinataClient(
    environment.pinatacloud.apiKey,
    environment.pinatacloud.apiSecret
  );
  encryptFunction = new Encryption();

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
  });

  constructor(
    private ModalService: NgbModal,
    private MetamaskService: MetamaskService,
    private route: ActivatedRoute,
    private router: Router,
    private db: DatabaseService,
    private sanitizer: DomSanitizer,
    private formService: EditFormService
  ) {
    this.passedStudent = this.formService.getStudentData();

    if (this.passedStudent) {
      this.dupSoNumber = this.encryptFunction.encryptData(
        this.passedStudent.soNumber
      );
      this.dupStudentId = this.encryptFunction.encryptData(
        this.passedStudent.studentId
      );
      this.dupStudentCourse = this.encryptFunction.encryptData(
        this.passedStudent.course
      );

      this.passedCourse = this.formService.getCourseData();
      this.passedStudent.sex = this.passedStudent.sex!.toLowerCase();
      this.myAngularxQrCode =
        this.passedStudent.txnHash ??
        'No txnHash for this Record! Inform the registrar.';
      this.studentForm.patchValue({
        course: this.passedStudent.course,
      });
    } else {
      this.router.navigate(['/dashboard']);
    }
  }



  ngOnInit(): void {
    // this.fetchNFTs();
  }
  // NEED TO IMPORT DOM SANITZER

  noSpacesValidator(control: FormControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value || /^\s+$/.test(value)) { // check if value is empty or just whitespace
      
      return {'blankSpaces': true};
    }
    return null;
  }

  isButtonTrue(gender: string): boolean {
    // Check if the passedStudent object exists and has a valid sex property
    if (this.passedStudent && this.passedStudent.sex) {
      // Convert the gender parameter to lowercase
      gender = gender.toLowerCase();
      // Check if the gender parameter matches the sex property of the passedStudent object
      if (this.passedStudent.sex === gender) {
        // If the gender matches, return true to check the radio button
        return true;
      }
    }
    // If the gender does not match or the passedStudent object does not exist or does not have a valid sex property, return false to uncheck the radio button
    return false;
  }
  backClick() {
    this.router.navigate(['/edit-student']);
  }
  setCheckedState() {
    // Check the male radio button if the passedStudent object has a sex property of 'male'
    if (this.isButtonTrue('male')) {
      this.maleRadioButton.checked = true;
    }
    // Check the female radio button if the passedStudent object has a sex property of 'female'
    if (this.isButtonTrue('female')) {
      this.femaleRadioButton.checked = true;
    }
  }

  onChangeURL(url?: SafeUrl) {
    if (this.myAngularxQrCode != '') {
      console.log(url);
      if (url) {
        // Changes whenever this.myAngularxQrCode changes
        this.qrCodeDownloadLink = url;
        // Converts SafeURL to URL of type string
        const validUrl = this.sanitizer.sanitize(
          SecurityContext.URL,
          this.qrCodeDownloadLink
        );

        if (validUrl) {
          // fetch converts the URL of type string to a Blob URL
          fetch(validUrl)
            .then((response) => response.blob())
            .then((blobData) => {
              // FileSaver automatically downloads the QR Code on submi  FileSaver.saveAs(validUrl, `${this.filename}.png`);
              // Upload files to Firebase Storage
              const storage = getStorage();
              const storageRef = ref(storage, `qr-codes/${this.filename}.png`);
              uploadBytes(storageRef, blobData).then((snapshot) => {
                console.log(snapshot);
              });
            });
        }
      }
      //produces BLOB URI/URL, browser locally stored data
      console.log(this.qrCodeDownloadLink);
    }
    // TODO: remove this method
  }

  // TODO: TO REMOVE

  // private checkIfMetamaskInstalled(): boolean {
  //   if (typeof (window as any).ethereum !== 'undefined') {
  //     this.ethereum = (window as any).ethereum;
  //     return true;
  //   }
  //   return false;
  // }



  async onSubmit() {
    const metamaskConnection =
      await this.MetamaskService.checkConnectionMetamask().then((res: any) => {
        this.ethereum = (window as any).ethereum;
        return res;
      });

      const dupeCounter = await this.db.checkEditDuplicate(
        this.studentForm.controls['studentId'].value!.trim(),
        this.studentForm.controls['course'].value!.trim(),
        this.studentForm.controls['soNumber'].value!.trim(),
  
        
      ).then((res: any) => {
        return res;
      });

    if (metamaskConnection) {
      if (this.studentForm.valid && dupeCounter.dupeCount < 1) {
        this.isMinting = true;
        this.progressMsg = 'Uploading Data to IPFS';


        const ipfsHash = await this.uploadToIPFS(
             this.encryptFunction.encryptData(this.studentForm.controls['studentId'].value!.trim()),
          this.encryptFunction.encryptData(this.studentForm.controls['soNumber'].value!.trim()),
          this.encryptFunction.encryptData(this.studentForm.controls['firstname'].value!.trim()),
          this.encryptFunction.encryptData(this.studentForm.controls['middlename'].value!.trim()),
          this.encryptFunction.encryptData(this.studentForm.controls['lastname'].value!.trim()),
          this.encryptFunction.encryptData(this.studentForm.controls['sex'].value!),
          this.encryptFunction.encryptData(this.studentForm.controls['course'].value!.trim()),
          ).then((res) => {
          return res;
        });

        this.progressMsg = 'Creating Blockchain Transaction';
        const txnHash = await this.createTransaction(ipfsHash).then((res) => {
          return res;
        });

        this.hasSubmit = true;
        // if(this.studentForm.controls['studentId'].value && txnHash){
        if (this.studentForm.controls['studentId'].value && txnHash) {
          this.filename = this.studentForm.controls['studentId'].value;
          this.myAngularxQrCode = txnHash;
        }

        this.studentForm.setValue({
          studentId: this.encryptFunction.encryptData(
            this.studentForm.controls['studentId'].value
          ),
          firstname: this.encryptFunction.encryptData(
            this.studentForm.controls['firstname'].value
          ),
          middlename: this.encryptFunction.encryptData(
            this.studentForm.controls['middlename'].value
          ),
          lastname: this.encryptFunction.encryptData(
            this.studentForm.controls['lastname'].value
          ),
          course: this.encryptFunction.encryptData(
            this.studentForm.controls['course'].value
          ),
          sex: this.encryptFunction.encryptData(
            this.studentForm.controls['sex'].value
          ),
          soNumber: this.encryptFunction.encryptData(
            this.studentForm.controls['soNumber'].value
          ),
          dataImg: `qr-codes/${this.studentForm.controls['studentId'].value}.png`,
          txnHash: txnHash,
        });
        console.log(this.dupStudentId);
        this.db.updateStudent(
          this.studentForm.value,
          this.dupStudentId,
          this.dupStudentCourse,
          this.dupSoNumber
        );
        this.hasSubmit = false;
        this.backClick();
      } else {
        const modalRef = this.ModalService.open(ModalPopupComponent);
        modalRef.componentInstance.message = dupeCounter.dupeMessage + 'Please check your fields.';
          
      }
    } else {
      const modalRef = this.ModalService.open(ModalPopupComponent);
      modalRef.componentInstance.message = 'No Metamask connection found!';
    }
    this.isMinting = false;
  }


  async uploadToIPFS(studentIdData: string, soNumberData: string, firstnameData: string, middleNameData: string, lastnameData : string, sexData: string, courseData: string): Promise<string>{
    let responseValue: string = '';
  const body = {
    studentId: studentIdData,
    qrCode: this.blobDataUrl,
    soNumber: soNumberData,
    firstname: firstnameData,
    middlename: middleNameData,
    lastname: lastnameData,
    sex: sexData,
    course: courseData,
    
    };
    const options: PinataPinOptions = {
      pinataMetadata: {
        name: 'Student Data',
      },
    };
    await this.pinata
      .pinJSONToIPFS(body, options)
      .then((result) => {
        //handle results here
        responseValue = result.IpfsHash;
      })
      .catch((err) => {
        //handle error here
        responseValue = 'failed';
        console.log(err);
      });
    return responseValue;
  }

  async createTransaction(ipfsHash: any): Promise<any> {
    if (!this.ethereum) {
      console.error('Ethereum object is required');
      return;
    }

    const provider = new ethers.providers.Web3Provider(this.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      this.CONTRACT_ADDRESS,
      this.contractABI,
      signer
    );

    try {
      const createTxn = await contract['create'](
        this.ipfsUrlPrefix + ipfsHash + this.ipfsQuery
      );

      console.log('Create transaction started...', createTxn.hash);
      await createTxn.wait();
      console.log('Created student record!', createTxn.hash);
      window.alert('Created student record! ' + createTxn.hash);
      this.isMinting = false;

      return createTxn.hash;
    } catch (err: any) {
      console.error(err.message);
      window.alert('Minting Failed' + err.message);
      this.myAngularxQrCode = '';
      this.isMinting = false;
    }
  }
}