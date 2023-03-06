import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/services/database.service';
import { PinataService } from 'src/app/services/pinata.service';

// QR Code Template Component
@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
      <h4 class="modal-title">SeQR QR Code Diploma</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <div class="container">
        <div style="width:800px; height:600px; padding:20px; text-align:center; border: 10px solid #787878">
          <div style="width:750px; height:550px; padding:20px; text-align:center; border: 5px solid #787878">
            <span style="font-size:50px; font-weight:bold">Certificate of Completion</span>
            <br><br>
            <span style="font-size:25px"><i>This is to certify that</i></span>
            <br><br>
            <span style="font-size:30px"><b>{{ipfsData.lastname}}, {{ipfsData.firstname}} {{ipfsData.middlename ??
                ''}}</b></span><br /><br />
            <span style="font-size:25px"><i>has completed the course</i></span> <br /><br />
            <span style="font-size:30px">{{ipfsData.course}}</span> <br /><br />
            <span style="font-size:20px">SO Number: <b>{{ipfsData.soNumber}}</b></span> <br /><br /><br /><br />
            <span style="font-size:25px"><i>dated</i></span><br>
            <span style="font-size:30px"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click'); refresh()">Close</button>
    </div>
	`,
  styleUrls: ['./diploma.component.css']
})
export class NgbdModalContent {
	@Input() ipfsData: any;

	constructor(public activeModal: NgbActiveModal, private router: Router) {}

  refresh() {
    this.router.navigate(['/'], { skipLocationChange: true }).then(() => {
      this.router.navigate(['read-qr']);
    });
  }
}

// QR Code Data Processing Component
@Component({
  selector: 'app-diploma',
  templateUrl: './diploma.component.html',
  styleUrls: ['./diploma.component.css']
})
export class DiplomaComponent implements OnInit, OnChanges {
  @Input() ipfsLink: string = '';
  @Input() index: number = -1;
  ipfsData: any;

  constructor(private modalService: NgbModal, private db: DatabaseService) { }

  ngOnInit(): void {
    this.db.setStudentList();
  }

  ngOnChanges(changes: SimpleChanges) {
    // handle input property changes
    if(changes['ipfsLink']){
      if(this.index == -1){
        // this.httpPinata.getDataFromPinata(this.ipfsLink).subscribe(item =>{
        //   console.log(item);
        //   this.ipfsData = item;
        // })
        this.db.getStudentFromIpfs(this.ipfsLink).subscribe(item =>{
          this.ipfsData = item[0];
          const modalRef = this.modalService.open(NgbdModalContent, { size: 'xl' });
		      modalRef.componentInstance.ipfsData = item[0];
        })
      }else{
        // this.httpPinata.getDataFromPinata(this.ipfsLink).subscribe(item =>{
        //   console.log(item);
        //   this.ipfsData = item[this.index];
        // })

        this.db.getStudentFromIpfsByIndex(this.ipfsLink, this.index).subscribe(item =>{
          this.ipfsData = item[0];
          const modalRef = this.modalService.open(NgbdModalContent, { size: 'xl' });
		      modalRef.componentInstance.ipfsData = item[0];
        })
      }
    }
  }
  decryptData(ipfs: any){
    console.log(ipfs);
  }
}
