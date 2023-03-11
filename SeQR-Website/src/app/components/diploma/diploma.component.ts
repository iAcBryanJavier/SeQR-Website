import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { PinataService } from 'src/app/services/pinata.service';
import { DiplomaTemplateComponent } from '../diploma-template/diploma-template.component';

// QR Code Data Processing Component
@Component({
  selector: 'app-diploma',
  templateUrl: './diploma.component.html',
  styleUrls: ['./diploma.component.css'],
})
export class DiplomaComponent implements OnInit, OnChanges {
  @Input() ipfsLink: string = '';
  @Input() index: number = -1;
  @Input() txnHash: string = '';
  @Output() isLoadingEvent = new EventEmitter<boolean>();
  @Output() progressBarMsgEvent = new EventEmitter<string>();
  @Output() progressBarValueEvent = new EventEmitter<number>();

  isLoading: boolean = false;
  progressBarMsg: string = '';
  progressBarValue: number = 0;

  ipfsData: any;

  constructor(
    private modalService: NgbModal,
    private db: PinataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.db.setStudentList();
  }

  ngOnChanges(changes: SimpleChanges) {
    // handle input property changes
    if (changes['txnHash']) {
      this.db
        .getStudentDiplomaFromBlockchain(this.txnHash, this.index)
        .subscribe((item) => {
          this.progressBarMsg = 'Displaying Student Diploma...';

          this.isLoadingEvent.emit(this.isLoading);
          this.progressBarValueEvent.emit(this.progressBarValue);
          this.progressBarMsgEvent.emit(this.progressBarMsg);

          const modalRef = this.modalService.open(DiplomaTemplateComponent, {
            size: 'xl',
          });
          modalRef.componentInstance.ipfsData = item[0];

          this.refresh();
        });
    }
  }

  decryptData(ipfs: any) {
    console.log(ipfs);
  }

  refresh() {
    this.router.navigate(['/'], { skipLocationChange: true }).then(() => {
      this.router.navigate(['read-qr']);
    });
  }
}
