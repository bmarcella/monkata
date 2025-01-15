import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-payroll-stat',
  templateUrl: './payroll-stat.component.html',
  styleUrls: ['./payroll-stat.component.css']
})
export class PayrollStatComponent implements OnInit {


  hroles: any[];
  taxe: number;
  constructor(public nServ: AppService) { }

  mois: any;
  year: any;
  payroll: any;
  msg = { msg: "", etat: false, active: false };
  query;

 bsold=0;
 nsold=0;

  ngOnInit() {
    this.getPayrollConfig();
  }

  getPayrollConfig() {
    const url = `${environment.apiUrl}pRFrags?sort=pos,asc`;
    this.nServ.getData(url).pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
          console.log(data);
          this.payroll = data._embedded.pRFrags;
        },
        error => {
        }
      );
  }
  getPayroll() {
    const url = `${environment.apiUrl}historic/${this.mois.id}`;
    this.nServ.getData(url).pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
          console.log(data);
          this.setStat(data.data);
        },
        error => {
        }
      );
  }

 setStat(data){
   data.forEach(e => {
     this.nsold += e.salaire_net;
     this.bsold += e.salaire_brut;
   });
   this.taxe = this.bsold - this.nsold ;
 }
  onOptionsSelected() {
    this.getPayroll();
  }

}
