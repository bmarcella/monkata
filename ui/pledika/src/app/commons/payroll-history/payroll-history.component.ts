import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-payroll-history',
  templateUrl: './payroll-history.component.html',
  styleUrls: ['./payroll-history.component.css']
})
export class PayrollHistoryComponent implements OnInit {

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
    const url = `${environment.apiUrl}historic/${this.mois.id}`;
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
