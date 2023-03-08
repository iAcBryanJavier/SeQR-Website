import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/services/database.service';
import { PinataService } from 'src/app/services/pinata.service';
import { DiplomaTemplateComponent } from '../diploma-template/diploma-template.component';

// QR Code Data Processing Component
@Component({
  selector: 'app-diploma',
  templateUrl: './diploma.component.html',
  styleUrls: ['./diploma.component.css']
})
export class DiplomaComponent implements OnInit, OnChanges {
  @Input() ipfsLink: string = '';
  @Input() index: number = -1;
  @Input() txnHash: string = '';
  @Output() isLoadingEvent = new EventEmitter<boolean>;
  @Output() progressBarMsgEvent = new EventEmitter<string>;
  @Output() progressBarValueEvent = new EventEmitter<number>;

  isLoading: boolean = false;
  progressBarMsg: string = ''
  progressBarValue: number = 0;

  ipfsData: any;

  constructor(private modalService: NgbModal, private db: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.db.setStudentList();
  }

  ngOnChanges(changes: SimpleChanges) {
    // handle input property changes
    if(changes['txnHash']){
      this.db.getStudentDiplomaFromBlockchain(this.txnHash, this.index).subscribe(item =>{
        this.progressBarMsg = 'Displaying Student Diploma...';

        this.isLoadingEvent.emit(this.isLoading);
        this.progressBarValueEvent.emit(this.progressBarValue);
        this.progressBarMsgEvent.emit(this.progressBarMsg);

        const modalRef = this.modalService.open(DiplomaTemplateComponent, { size: 'xl' });
        modalRef.componentInstance.ipfsData = item[0];

        this.refresh();
      })



      // if(this.index == -1){
      //   this.db.getStudentFromIpfs(this.ipfsLink).subscribe(item =>{
      //     this.isLoading = true;
      //     this.progressBarValue = 75
      //     this.progressBarMsg = 'Getting Student From IPFS'

      //     this.isLoadingEvent.emit(this.isLoading);
      //     this.progressBarValueEvent.emit(this.progressBarValue);
      //     this.progressBarMsgEvent.emit(this.progressBarMsg);

      //     this.ipfsData = item[0];

      //     this.progressBarValue = 100
      //     this.progressBarMsg = 'Displaying Student Diploma'
      //     this.progressBarValueEvent.emit(this.progressBarValue);
      //     this.progressBarMsgEvent.emit(this.progressBarMsg);

      //     const modalRef = this.modalService.open(NgbdModalContent, { size: 'xl' });
		  //     modalRef.componentInstance.ipfsData = item[0];
      //   })
      // }else{
      //   console.log(this.txnHash);
      //   this.db.getStudentDiplomaFromBlockchain(this.txnHash, this.index).subscribe(item =>{
      //     this.isLoading = true;
      //     this.progressBarValue = 100;
      //     this.progressBarMsg = 'Displaying Student from IPFS';

      //     this.isLoadingEvent.emit(this.isLoading);
      //     this.progressBarValueEvent.emit(this.progressBarValue);
      //     this.progressBarMsgEvent.emit(this.progressBarMsg);

      //     const modalRef = this.modalService.open(NgbdModalContent, { size: 'xl' });
		  //     modalRef.componentInstance.ipfsData = item[0];
      //   })
      // }
    }
  }

  decryptData(ipfs: any){
    console.log(ipfs);
  }

  refresh(){
    this.router.navigate(['/'], { skipLocationChange: true }).then(() => {
      this.router.navigate(['read-qr']);
    });
  }
}
