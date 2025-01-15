import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { AppService } from 'src/app/_Services/app.service';

@Component({
  selector: 'app-my-pay',
  templateUrl: './my-pay.component.html',
  styleUrls: ['./my-pay.component.css']
})
export class MyPayComponent implements OnInit {

  query: string;
  constructor(public studServ: AppService) { }
  page = 0;
  // tslint:disable-next-line: no-inferrable-types
  size: number = 10;
  users;
  p: any;
  tp = [];
  rtp;
  ngOnInit() {
     this.getAll();
  }

  getDate(d) {
    if (d != null) {
      return d.split("T")[0];
    }
    return "non mentioné";
  }


  getAll() {
    const url = `${environment.apiUrl}getPaymentForUser/${this.page}`;
    this.studServ
      .getData(url)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if(!data.crash) {
            this.users = data.data.content;
            this.p = data.data.pageable;
            this.setPage(data.data.totalPages);
          }  else{
            this.users = [];
           }
        },
        error => { }
      );
  }

  setPage(j) {
    this.tp = [];
    this.rtp = j;
    for (let i = 1; i <= j; i++) {
      this.tp.push({ index: (i - 1), page: i });
    }
  }
  changePage(i) {
    if (this.page !== i) {
      this.page = i;
      this.getAll();
    }
  }

}
