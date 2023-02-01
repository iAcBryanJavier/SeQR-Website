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

    

  }
  encryptFunction = new Encryption();

  ngOnInit(): void {
  }

  // getBase64Img(imgUrl : SafeUrl): void{
  //   const validUrl = this.sanitizer.sanitize(SecurityContext.URL, this.qrCodeDownloadLink);
  //     if(validUrl){
  //        this.sanitizedUrl = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(validUrl));
  //       console.log(this.sanitizedUrl);
  //       // reader.readAsDataURL(this.sanitizedUrl){}
  //       var canvas = document.createElement("canvas");
  //       var context = canvas.getContext("2d");
  //       context.drawImage(this.sanitizedUrl, 0, 0) // i assume that img.src is your blob url
  //       var dataurl = canvas.toDataURL("your prefer type", your prefer quality)
  //     }else{
     
  //     }

  // }   

  
      /*    
        
          // const validUrl = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(url));

      const validUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
      if(validUrl){
        const sanitizedUrl = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(validUrl));
        this.qrCodeDownloadLink != sanitizedUrl;
        console.log(this.qrCodeDownloadLink);
        console.log("Safe Route");
      }else{
     
      }
        
        
        */


  onSubmit(){
    if(this.studentForm.valid){
      if(this.studentForm.controls['studentId'].value){
        this.myAngularxQrCode = this.studentForm.controls['studentId'].value;
        // this.getBase64Img(this.qrCodeDownloadLink);
      
        
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


