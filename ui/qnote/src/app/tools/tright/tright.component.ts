import { Component, Input, OnInit } from '@angular/core';
import { BaseApp } from '../BaseApp';
import { Acad } from '../models/Gen/Acad';

@Component({
  selector: 'app-tright',
  templateUrl: './tright.component.html',
  styleUrls: ['./tright.component.css']
})
export class TRightComponent extends BaseApp implements OnInit {
  @Input()  period: Acad;
  @Input() tools: boolean;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
