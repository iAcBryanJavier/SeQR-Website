import { Component } from '@angular/core';




@Component({
  selector: 'read-qr-component',
  templateUrl: './read-qr-component.component.html',
  styleUrls: ['./read-qr-component.component.css']
})
export class ReadQrComponentComponent  {
  // declare GetQrData: string;
  result!: any;
  url: string|null|ArrayBuffer = ''; 
  constructor() { 
    // this.myScriptElement = document.createElement("script");
    // this.myScriptElement.src = "https://unpkg.com/@zxing/library@latest";
    // document.body.appendChild(this.myScriptElement);
  
  }

  ngOnInit(): void {
   
  }

  decodeOrCode(): void{
    import('../../assets/js/decode-script.js').then(randomFile =>{
       randomFile.GetQrData();
       this.result = randomFile.resultOfQR;
    });
  }

  processFile(imageInput: any) {
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
}

 
 
  

