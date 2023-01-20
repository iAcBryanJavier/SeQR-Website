import { Component } from '@angular/core';




@Component({
  selector: 'read-qr-component',
  templateUrl: './read-qr-component.component.html',
  styleUrls: ['./read-qr-component.component.css']
})
export class ReadQrComponentComponent  {
  declare GetQrData: any;
  constructor() { 
    // this.myScriptElement = document.createElement("script");
    // this.myScriptElement.src = "https://unpkg.com/@zxing/library@latest";
    // document.body.appendChild(this.myScriptElement);
  
  }

  ngOnInit(): void {
    import('../../assets/js/decode-script.js').then(randomFile =>{
      randomFile.GetQrData()
    });
  }
}

 
 
  

