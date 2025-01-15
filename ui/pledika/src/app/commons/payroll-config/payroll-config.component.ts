import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-payroll-config',
  templateUrl: './payroll-config.component.html',
  styleUrls: ['./payroll-config.component.css']
})
export class PayrollConfigComponent implements OnInit {
  payroll: any;

  constructor(public nServ: AppService) { }

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

  toggle(o, i, s) {
    const DATA = {
      activated: s
    };
    const url = `${environment.apiUrl}pRFrags/${o.id}`;
    this.nServ.editData(url, DATA).pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
           this.payroll[i].activated = s;
        },
        error => {
        }
      );
  }

  edit(i, o) {
    const DATA = {
      jour: o.jour
    };
    const url = `${environment.apiUrl}pRFrags/${o.id}`;
    this.nServ.editData(url, DATA).pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
          this.payroll[i].jour = o.jour;
        },
        error => {
        }
      );
  }



}
