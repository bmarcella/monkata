import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tuto',
  templateUrl: './tuto.component.html',
  styleUrls: ['./tuto.component.css']
})
export class TutoComponent implements OnInit {
  show: any;
  page = 0;
  lpage = 2;
  fpage = 0;
  constructor() { }

  ngOnInit(): void {
    this.show = (localStorage.getItem('TUTO')) ? '0' : '1';
    console.log(this.show);
  }

  save() {
    localStorage.setItem('TUTO', "0");
    this.show = '0';
  }

  goBack() {
    --this.page;
  }

  goTo(is) {
    if (is) {
      this.save();
      return;
    }
    this.page++;
  }

}
