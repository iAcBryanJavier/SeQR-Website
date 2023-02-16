import { Component, Inject, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Encryption } from 'src/app/models/encryption';
import { DatabaseService } from 'src/app/services/database.service';
import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { getBootstrapBaseClassPlacement } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { ethers } from 'ethers';
import contract from '../../contracts/Student.json';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  public sanitizedUrl!: string | null;
  public blobDataUrl: any;
  public ethereum: any;
  public hasSubmit: boolean = false;
  public isMinting: boolean = false;

  readonly CONTRACT_ADDRESS: string = '0x8594bc603F61635Ef94D17Cc2502cb5bcdE6AF0a';
  public contractABI = contract.abi;
  public nfts: any = [];

  public courses: any = [];

  // form group for add stduent form to db 
  studentForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    middlename: new FormControl(''),
    lastname: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    studentId: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    soNumber: new FormControl('', Validators.required)
  })

  // NEED TO IMPORT DOM SANITZER 
  constructor(private db: DatabaseService, private sanitizer: DomSanitizer) {
    this.myAngularxQrCode = 'Sample QR Code';// Initial QR Code Value

  }
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url; // Changes whenever this.myAngularxQrCode changes
    //produces BLOB URI/URL, browser locally stored data

    if (this.hasSubmit) {
      this.getBase64Img();
    } else {

    }
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

    var xhr = new XMLHttpRequest;
    xhr.responseType = 'blob';

    xhr.onload = function () {
      var recoveredBlob = xhr.response;

      var reader = new FileReader;

      reader.onload = function () {
        var blobAsDataUrl = reader.result;
        console.log(blobAsDataUrl)
      };
      reader.readAsDataURL(recoveredBlob);
    };
    const validUrl = this.sanitizer.sanitize(SecurityContext.URL, this.qrCodeDownloadLink);
    //  console.log(validUrl, "\nThis is the current QR CODE VALUE: ", this.myAngularxQrCode);
    if (validUrl) {
      xhr.open('GET', validUrl);
      xhr.send();

    }
    this.hasSubmit = false;
  }

  private checkIfMetamaskInstalled(): boolean {
    if (typeof (window as any).ethereum !== 'undefined') {
      this.ethereum = (window as any).ethereum;
      return true;
    }
    return false;
  }

  async onSubmit() {
 
    if (this.studentForm.valid) {
      if (this.studentForm.controls['studentId'].value) {
        this.studentForm.reset();
        this.hasSubmit = true;
        this.myAngularxQrCode = this.studentForm.controls['studentId'].value;

      }
      //encryption of data
      this.studentForm.setValue({
        studentId: this.encryptFunction.encryptData(this.studentForm.controls['studentId'].value),
        firstname: this.encryptFunction.encryptData(this.studentForm.controls['firstname'].value),
        middlename: this.encryptFunction.encryptData(this.studentForm.controls['middlename'].value),
        lastname: this.encryptFunction.encryptData(this.studentForm.controls['lastname'].value),
        course: this.encryptFunction.encryptData(this.studentForm.controls['course'].value),
        sex: this.encryptFunction.encryptData(this.studentForm.controls['sex'].value),
        soNumber: this.encryptFunction.encryptData(this.studentForm.controls['soNumber'].value)
      })
      //add to firebase realtime database
      this.db.addStudent(this.studentForm.value);

      if (!this.ethereum) {
        console.error('Ethereum object is required to create a keyboard');
        return;
      }

      this.isMinting = true;
      const provider = new ethers.providers.Web3Provider(this.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.CONTRACT_ADDRESS, this.contractABI, signer);

      try{
        const createTxn = await contract['create'](this.studentForm.controls['studentId'].value);

        console.log('Create transaction started...', createTxn.hash);
        await createTxn.wait();
        console.log('Created student record!', createTxn.hash);
        window.alert('Created student record! ' + createTxn.hash);
        this.isMinting = false;
      }catch(err: any){
        console.error(err.message);
        window.alert('Minting Failed' + err.message);
        this.isMinting = false;
      }
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