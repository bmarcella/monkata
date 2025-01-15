import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admis-fiche',
  templateUrl: './admis-fiche.component.html',
  styleUrls: ['./admis-fiche.component.css']
})
export class AdmisFicheComponent implements OnInit {

  pay: any;

  constructor(private route: ActivatedRoute, private app: AppService, public studServ: StudentsService) { }

  etab: any;
  CODE: any;
  USER: any;
  results: any = [];

  // tslint:disable-next-line:variable-name
  total = { note: 0, coef: 0 };

  // tslint:disable-next-line:variable-name
  pf: any;
  admis;

  ngOnInit() {
    this.getEtabInfo();
    this.CODE = this.route.snapshot.params.code;
    this.getPay();
  }


  getPay() {
   // tslint:disable-next-line:prefer-const
   let code  = this.CODE.split('-');
   code  = code[1] + '-' + code[2];
   this.app.getData(`${environment.apiUrl}findUserByCode/${code}`)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.pay = data.data;
          // tslint:disable-next-line: no-unused-expression
          this.admis=data.data.paiement_admission;
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
