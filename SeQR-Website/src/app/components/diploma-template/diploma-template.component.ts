import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-diploma-template',
  templateUrl: './diploma-template.component.html',
  styleUrls: ['./diploma-template.component.css']
})
export class DiplomaTemplateComponent implements OnInit {
  @Input() ipfsData: any;

  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  ngOnInit(): void {
  }
}
