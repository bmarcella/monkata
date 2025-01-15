import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: "app-hencaissement",
  templateUrl: "./hencaissement.component.html",
  styleUrls: ["./hencaissement.component.css"],
})
export class HencaissementComponent implements OnInit {
  loading: any;
  maker = [];
  caiss = [];
  constructor(public studServ: StudentsService, public nServ: AppService) {}

  ngOnInit() {
     this.getCaisse();
  }

  setDate(date: any) {
    const nd = new DatePipe("en-US").transform(date, "yyyy-MM-dd");
    return nd;
  }

  getCaisse() {
    const url = `${environment.apiUrl}getCaisse`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          if (!data.crash) {
             console.log(data);
              this.maker = data.data.csm;
              this.caiss = data.data.csc;
          }
        },
        (error) => {

        }
      );
  }
}
