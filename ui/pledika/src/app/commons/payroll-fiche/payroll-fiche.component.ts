import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-payroll-fiche',
  templateUrl: './payroll-fiche.component.html',
  styleUrls: ['./payroll-fiche.component.css'],
})
export class PayrollFicheComponent implements OnInit {
  pay: any;
  payroll: any;

  constructor(
    private route: ActivatedRoute,
    private app: AppService,
    public studServ: StudentsService
  ) {}

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
    this.getPay();
  }

  getUserById() {}

  getPay() {
    this.app
      .getData(`${environment.apiUrl}payrolls/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.pay = data;
          this.getPayrollConfig(data.id_mois);
        },
        (error) => {}
      );
  }

  getPayrollConfig(id) {
    const url = `${environment.apiUrl}pRFrags/${id}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          this.payroll = data;
        },
        (error) => {}
      );
  }
  getEtabInfo() {
    this.app
      .getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.etab = data._embedded.etablissements[0];
        },
        (error) => {}
      );
  }
}
