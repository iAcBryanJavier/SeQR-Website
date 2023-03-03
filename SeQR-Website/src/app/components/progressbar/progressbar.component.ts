import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {
  @Input() isMinting: boolean = false;
  @Input() progressBarValue: number = 0;
  @Input() progressBarMsg: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
