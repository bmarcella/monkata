import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-payroll-create',
  templateUrl: './payroll-create.component.html',
  styleUrls: ['./payroll-create.component.css']
})
export class PayrollCreateComponent implements OnInit {

  mois: any;
  year: any ;
  payroll: any;
  users = [];
  roles: any;
  msg = [{ msg: '', etat: false, active: false }];
  tp: any;
  tps = [];
  constructor(public nServ: AppService) { }

  ngOnInit() {
    this.getPayrollConfig();
    this.getTP();
  }

  getTP() {
    const url = `${environment.apiUrl}getTypePay`;
    this.nServ.getData(url).pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
          this.tps = data.data;
        },
        error => {
        }
      );
  }

  getPayrollConfig() {
    const url = `${environment.apiUrl}pRFrags?sort=pos,asc`;
    this.nServ.getData(url).pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
          this.payroll = data._embedded.pRFrags;
        },
        error => {
        }
      );
  }
  getUsers() {
    const url = `${environment.apiUrl}getUserForPayroll`;
    this.nServ.getData(url).pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
          this.roles = data.data;
        },
        error => {
        }
      );
  }

 delUser(i, j) {
   this.roles[i].users.splice(j, 1);
 }

  pay(o, role, i, j, tp) {
  if (tp !== '') {
     const DATA = {
            user : o.id,
            code : this.mois.mois,
            id_mois: this.mois.id,
            tpay: tp
      };
     const url = `${environment.apiUrl}payroll`;
     this.nServ.setData(url, DATA).pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
          this.delUser(i, j);
          if (!data.crash) {
            this.msg[i] =  {msg: data.message, etat: true , active: true };
          } else {
            this.msg[i] = { msg: data.message, etat: false, active: true };
          }
        },
        error => {
          this.msg[i] = { msg: 'erreur serveur', etat: false, active: true };
        }
      );
   } else {
      this.msg[i] = { msg: 'Vous devez choisir le type de paiement', etat: false, active: true };
   }
  }


  onOptionsSelected() {
    this.getUsers();
  }

}
