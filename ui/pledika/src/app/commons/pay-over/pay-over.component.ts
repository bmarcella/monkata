import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-pay-over',
  templateUrl: './pay-over.component.html',
  styleUrls: ['./pay-over.component.css']
})
export class PayOverComponent implements OnInit {
  hroles: any[];
  constructor(public nServ: AppService) { }

  mois: any;
  year: any;
  payroll: any;
  roles = [];
  msg = { msg: "", etat: false, active: false };
  query;

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
    const url = `${environment.apiUrl}getPayroll/${this.mois.id}`;
    this.nServ.getData(url).pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
          console.log(data);
          this.roles = data.data;
          this.hroles = this.roles;
        },
        error => {
        }
      );
  }

  pay(o, i) {
    const url = `${environment.apiUrl}recPayroll/${o.id}`;
    this.nServ.getData(url).pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
          if (!data.crash) {
            this.roles[i] = data.data;
            this.msg = { msg: data.message, etat: true, active: true };
          } else {
            this.msg = { msg: data.message, etat: false, active: true };
          }
        },
        error => {
        }
      );
  }


  onOptionsSelected() {
    this.getPayroll();
  }
  onKeyUp(e) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
      this.roles = this.filterItems(query);
    } else {
      this.roles = this.hroles;
    }
  }

  filterItems(searchTerm) {
    return this.roles.filter(item => {
      return item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_user.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
