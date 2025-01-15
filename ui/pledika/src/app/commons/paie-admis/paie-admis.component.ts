import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-paie-admis',
  templateUrl: './paie-admis.component.html',
  styleUrls: ['./paie-admis.component.css']
})
export class PaieAdmisComponent implements OnInit {
  loading: any = false;
  aloading = false;
  CODE: string;
  USER: any;
  response = { state: '', message: '', active: false };
  pay;
  constructor(private route: ActivatedRoute, public app: AppService, public studServ: StudentsService, ) { }
  ngOnInit() {
    this.CODE="";
    this.getPay();
  }

  getDate(date) {
   const a = date.split('T');
   return a[0];
  }

  payAdmis(code) {

    this.aloading = true;
    this.studServ.payByUserId(code)
      .pipe(first())
      .subscribe(data => {
        this.aloading = false;
        this.response.message = data.message;
        if (!data.crash) {
          this.response.active = false;
          this.USER = data.data;
        } else {
          this.response.active = true;
          this.response.state = 'danger';
        }
      }, error => {
        this.aloading = false;
        this.response.active = true;
        this.response.state = 'danger';
        this.response.message = error;
      });

  }

  getUserByCode(code: string) {
    if (code === '') {
      this.response.active = true;
      this.response.state = 'danger';
      this.response.message = 'champ vide.';
      return;
    }
    this.USER = {};
    code = code.toUpperCase();
    this.loading = true;
    this.studServ.getUserByCode(code)
      .pipe(first())
      .subscribe(data => {

        this.loading = false;
        if (data != null) {
             this.response.active = false;
             this.USER = data;
             console.log(data);
         } else {
          this.USER = {};
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = 'Postulant non trouvé';
         }
      }, error => {
          this.USER = {};
          this.loading = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
      });

  }

  getPay() {
    this.app.getData(`${environment.apiUrl}getPayment`)
      .pipe(first())
      .subscribe(
        data => {
          this.pay = data.data;
        },
        error => {
        }
      );

  }
}
