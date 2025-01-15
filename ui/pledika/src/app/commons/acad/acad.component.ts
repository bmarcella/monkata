import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';

@Component({
  selector: "app-acad",
  templateUrl: "./acad.component.html",
  styleUrls: ["./acad.component.css"],
})
export class AcadComponent implements OnInit {
  user: any;
  etab: any;
  constructor(public nServ: AppService, private auth: AuthenticationService) {
    this.user = this.auth.currentUserValue;
  }
  loading;
  a: any = { date_debut: "", date_fin: "" };
  submitted = false;
  success = "";
  cindex = null;
  af = [];
  response = { state: "", message: "", active: false };
  del;
  add;
  pos;
  ngOnInit() {
    this.getAcad();
    this.getEtabInfo();
  }

  getEtabInfo() {
    this.nServ
      .getData(`${environment.apiUrl}etablissements?size=1`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.etab = data._embedded.etablissements[0];
        },
        (error) => {}
      );
  }

  setSetCurrentYear(id) {
    const url = `${environment.apiUrl}setCurrentYear/${id}`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) =>{},
        (error) =>{}
      );
  }

  getAcad() {
    const url = `${environment.apiUrl}promo_afs?size=1000`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.af = data._embedded.promo_afs;
        },
        (error) => {}
      );
  }

  delAcad(item, i) {
    this.del = item;
    this.pos = i;
  }

  check(state) {
    this.del = false;
  }

  preAddAcad(item) {
    this.add = item;
  }
  checka(state) {
    this.add = false;
  }
  delNow() {
    const url = `${environment.apiUrl}promo_afs/${this.del.id}`;
    this.nServ
      .delData(url)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          console.log(data);
          this.loading = false;
          this.response.active = true;
          this.del = false;
          this.af.splice(this.pos, 1);
          this.response.state = "success";
          this.response.message = "";
          this.a = { date_debut: "", date_fin: "" };
        },
        (error) => {
          this.del = false;
          this.response.active = true;
          this.response.state = "danger";
          this.response.message = error;
          this.loading = false;
        }
      );
  }

  state(o, i) {
    const url = `${environment.apiUrl}openAC/${o.id}`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          this.loading = false;
          this.response.active = true;
          if (!data.crash) {
            this.del = false;
            this.work(i);
            this.setSetCurrentYear(o.id);
            this.response.state = "success";
            this.response.message = "";
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = "danger";
          this.response.message = error;
          this.loading = false;
        }
      );
  }

  work(p) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.af.length; i++) {
      this.af[i].actived = false;
    }
    this.af[p].actived = true;
  }
  addAcad() {
    let data = {};
    if (this.af != null && this.af.length > 0) {
      data = {
        date_debut: this.a.date_debut,
        date_fin: this.a.date_fin,
        moy_total: this.etab.moy_total,
        moy_accept: this.etab.moy_accept,
        moy_reprise: this.etab.moy_reprise,
        moy_exc: this.etab.moy_exc,
        currency: this.etab.currency,
        prix_admis: this.etab.prix_admis,
        ona: this.etab.ona,
        iri: this.etab.iri,
        iri_1: this.etab.iri_1,
        iri_2: this.etab.iri_2,
        iri_3: this.etab.iri_3,
        iri_4: this.etab.iri_4,
        cfgdct: this.etab.cfgdct,
        fdu: this.etab.fdu,
        cas: this.etab.cas,
        assure_mal: this.etab.assure_mal,
        date_admis_debut: this.etab.date_admis_debut,
        date_admis_fin: this.etab.date_admis_debut,
        nbre_ctrl: this.etab.nbre_ctrl,
        frag_name: this.etab.frag_name,
        type_reprise: this.etab.type_reprise,
        reprise: this.etab.reprise,
        year_part: this.etab.year_part,
        start_time: this.etab.start_time,
        end_time : this.etab.end_time,
        mode_paiement : this.etab.mode_paiement
      };
    } else {
      data = {
        date_debut: this.a.date_debut,
        date_fin: this.a.date_fin,
        actived: true,
        moy_total: this.etab.moy_total,
        moy_accept: this.etab.moy_accept,
        moy_reprise: this.etab.moy_reprise,
        moy_exc: this.etab.moy_exc,
        currency: this.etab.currency,
        prix_admis: this.etab.prix_admis,
        ona: this.etab.ona,
        iri: this.etab.iri,
        iri_1: this.etab.iri_1,
        iri_2: this.etab.iri_2,
        iri_3: this.etab.iri_3,
        iri_4: this.etab.iri_4,
        cfgdct: this.etab.cfgdct,
        fdu: this.etab.fdu,
        cas: this.etab.cas,
        assure_mal: this.etab.assure_mal,
        date_admis_debut: this.etab.date_admis_debut,
        date_admis_fin: this.etab.date_admis_debut,
        nbre_ctrl: this.etab.nbre_ctrl,
        frag_name: this.etab.frag_name,
        type_reprise: this.etab.type_reprise,
        reprise: this.etab.reprise,
        year_part: this.etab.year_part,
      };
    }
    const url = `${environment.apiUrl}promo_afs`;
    this.nServ
      .setData(url, data)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          this.loading = false;
          this.response.active = true;
          this.add = false;
          if (data) {
            this.af.push(data);
            this.response.state = "success";
            this.response.message = "";
            this.a = { date_debut: "", date_fin: "" };
          } else {
            this.response.state = "danger";
            this.response.message = "";
          }
        },
        (error) => {
          this.add = false;
          this.response.active = true;
          this.response.state = "danger";
          this.response.message = error;
          this.loading = false;
        }
      );
  }
}
