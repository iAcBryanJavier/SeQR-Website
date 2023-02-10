import { Component, Inject, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Encryption } from 'src/app/models/encryption';
import { DatabaseService } from 'src/app/services/database.service';
import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';



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
  public hasSubmit: boolean = false;
  // form group for add stduent form to db 
  studentForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    middlename: new FormControl(''),
    lastname: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    batch: new FormControl('', Validators.required),
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
    
 
    if(this.hasSubmit){
      this.getBase64Img();
    }else{

    }

    

  }


  encryptFunction = new Encryption();

  ngOnInit(): void {
  }

   getBase64Img(){

    var xhr = new XMLHttpRequest;
    xhr.responseType = 'blob';


    xhr.onload = function() {
      var recoveredBlob = xhr.response;
   
      var reader = new FileReader;

      reader.onload = function() {
         var blobAsDataUrl = reader.result;
        console.log(blobAsDataUrl)
        
      };
   
      reader.readAsDataURL(recoveredBlob);
   };
  const validUrl = this.sanitizer.sanitize(SecurityContext.URL, this.qrCodeDownloadLink);
 //  console.log(validUrl, "\nThis is the current QR CODE VALUE: ", this.myAngularxQrCode);
if(validUrl){
  xhr.open('GET', validUrl);
  xhr.send();

}

    this.hasSubmit = false;
  }   




   onSubmit(){
    if(this.studentForm.valid){
      if(this.studentForm.controls['studentId'].value){
        this.hasSubmit = true;
        this.myAngularxQrCode = this.studentForm.controls['studentId'].value;
       
      }

    

  
      this.studentForm.setValue({
        studentId: this.encryptFunction.encryptData(this.studentForm.controls['studentId'].value),
        firstname: this.encryptFunction.encryptData(this.studentForm.controls['firstname'].value),
        middlename: this.encryptFunction.encryptData(this.studentForm.controls['middlename'].value),
        lastname: this.encryptFunction.encryptData(this.studentForm.controls['lastname'].value),
        course: this.encryptFunction.encryptData(this.studentForm.controls['course'].value),
        batch: this.encryptFunction.encryptData(this.studentForm.controls['batch'].value),
        sex: this.encryptFunction.encryptData(this.studentForm.controls['sex'].value),
        soNumber: this.encryptFunction.encryptData(this.studentForm.controls['soNumber'].value)
      })
      this.db.addStudent(this.studentForm.value);
   
    }



  }



  
}


