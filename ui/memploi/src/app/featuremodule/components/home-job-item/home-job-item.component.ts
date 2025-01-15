import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-job-item',
  templateUrl: './home-job-item.component.html',
  styleUrls: ['./home-job-item.component.scss']
})
export class HomeJobItemComponent {
  
  @Input()
  job: any;


  @Input()
  showApply: boolean | undefined;

  @Input()
  cjob: any | undefined;



}
