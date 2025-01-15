import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { StudentsService } from 'src/app/_Services/StudentsService';

@Component({
  selector: 'app-fiche-payment',
  templateUrl: './fiche-payment.component.html',
  styleUrls: ['./fiche-payment.component.css']
})
export class FichePaymentComponent implements OnInit {
  pay: any;

  constructor(private route: ActivatedRoute, private app: AppService, public studServ: StudentsService) { }

  etab: any;
  ID: any;
  IDP: any;
  USER: any;
  results: any = [];

  // tslint:disable-next-line:variable-name
  total = { note: 0, coef: 0 };

  // tslint:disable-next-line:variable-name
  pf: any;

  ngOnInit() {
    this.getEtabInfo();
    this.ID = this.route.snapshot.params.id;
    this.IDP = this.route.snapshot.params.idp;
    this.getPF();
    this.getPay();
  }

  getUserById() {

  }


  getPay() {
    this.app.getData(`${environment.apiUrl}getPayment/${this.ID}`)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.pay = data.data;
        },
        error => {
        }
      );
  }

  getPF() {
    this.app.getData(`${environment.apiUrl}getOneParcours/${this.IDP}`)
      .pipe(first())
      .subscribe(
        data => {
          this.pf = data.data;
        },
        error => {
        }
      );
  }
  getEtabInfo() {
    this.app.getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        data => {
          this.etab = data._embedded.etablissements[0];
        },
        error => {
        }
      );
  }


}
