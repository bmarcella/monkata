import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-bulletin-gen',
  templateUrl: './bulletin-gen.component.html',
  styleUrls: ['./bulletin-gen.component.css'],
})
export class BulletinGenComponent implements OnInit {
  IDP: any;
  POS: number;
  promo: any;
  CODE: any;
  NBRE_CTRL = 4;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private app: AppService,
    public studServ: StudentsService
  ) {}
  iloading: boolean;
  STUDS = [];
  HSTUDS: any;
  etab: any;
  ID: any;
  IDF: any;
  USER: any;
  results: any = [];
  cpars: any;
  cont;
  newRes = [];

  // tslint:disable-next-line:variable-name
  total = {
    coef: 0,
    ctrl_1: 0,
    ctrl_2: 0,
    ctrl_3: 0,
    ctrl_4: 0,
    moy: 0,
    extra: 0,
    ctrl_5: 0,
    ctrl_6: 0,
  };

  // tslint:disable-next-line:variable-name
  pf: any = [];
  moy = [];

  setBG(o) {
    // tslint:disable-next-line:triple-equals
    if (o == this.ID) {
      return '#34c929';
    }
    return '';
  }

  setTC(o) {
    if (o.id === this.ID) {
      return 'white';
    }
    return '';
  }
  changePage(idu, idf, i) {
    this.ID = idu;
    this.POS = i;
    this.init(this.IDP);
  }

  ngOnInit() {
    this.ID = this.route.snapshot.params.idu;
    this.POS = -1;
    this.IDP = this.route.snapshot.params.idp;
    this.init(this.IDP);
  }

  init(idp) {
    this.promo = null;
    this.pf = [];
    this.total = {
      coef: 0,
      ctrl_1: 0,
      ctrl_2: 0,
      ctrl_3: 0,
      ctrl_4: 0,
      moy: 0,
      extra: 0,
      ctrl_5: 0,
      ctrl_6: 0,
    };
    this.getEtabInfo();
    this.getPROMO(idp);

    this.cont = 0;
    this.results = [];
    this.newRes = [];
  }
  setPage(idu) {
    this.ID = idu;
  }
  setCPars(data) {
    data.forEach((e) => {
      if (e.id === this.ID) {
        this.cpars = e;
        return;
      }
    });
  }

  getMoyGen(IDF, i) {
    this.app
      .getData(`${environment.apiUrl}getMoyGenFrag/${IDF}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.moy[i] = data;
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
  getPROMO(idp) {
    this.app
      .getData(`${environment.apiUrl}promotions/${idp}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.promo = data;
          this.getParcours(idp);
          this.getPF(data._links.promofrag);
        },
        (error) => {}
      );
  }
  getParcours(idp) {
    this.iloading = true;
    this.app
      .getData(`${environment.apiUrl}promotions/${idp}/parcours`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.iloading = false;
          this.STUDS = data._embedded.parcourses;
          this.HSTUDS = this.STUDS;
          this.setCPars(this.STUDS);
        },
        (error) => {
          this.iloading = false;
        }
      );
  }
  getPF(url) {
    this.app
      .getData(url.href)
      .pipe(first())
      .subscribe(
        (data) => {
          this.getResult(data._embedded.promoFrags);
        },
        (error) => {}
      );
  }
  getResult(data) {
    let i = 0;
    data.forEach((e) => {
      if (e.base || e.reprise) {
        this.pf.push(e);
        this.getNote(e, i);
        this.getMoyGen(e.id, i);
        this.cont++;
        i++;
      }
    });
  }
  getNote(item, i) {
    const url = `${environment.apiUrl}getGenResult/${this.ID}/${item.id}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.results[i] = data.data;
        },
        (error) => {}
      );
  }

  getDec(moy_accept, moy, rep, ir, tr) {
    if (moy >= moy_accept) {
      return 'L\'élève est promu en classe superieure avec une moyenne de ' + moy;
      } else {
      if (ir === 2) {
        return 'L\'élève doit refaire la classe';
      } else {
        if (tr === 1) {
          if (rep > 0) {
            if (rep < moy_accept) {
              return 'Après une reprise l\'élève doit refaire la classe';
            } else {
              return (
                'Après une reprise l\'élève est promu en classe superieure avec la moyenne de ' +
                rep
              );
            }
          } else {
            return 'L\'élève doit refaire la classe';
          }
        } else {
        }
      }
    }
  }

  getRepMoy(rep, moy, coef) {
    if (this.etab.type_reprise === 1) {
      return (rep / coef) * moy;
    } else {
      let tmoy = this.total.moy;
      tmoy = this.total.ctrl_5;
      tmoy += this.total.ctrl_6;
      return (tmoy / coef) * moy.toFixed(2);
    }
  }

  initMoyGen() {
    this.arrange();
    this.getSetTotal(this.newRes);
  }

  arrange() {
   console.log(this.results);
   this.results[0].forEach((e) => {
      if (this.newRes.length === 0) {
        this.newRes.push({
          note_pass:  e.note_pass,
          note_total: e.note_total,
          frag_cours: e.frag_cours.name,
          coef: e.coef,
          ctrl_1: e.note,
          ctrl_2: 0,
          ctrl_3: 0,
          ctrl_4: 0,
          moy: 0,
          extra: 0,
        });
      } else {
        let f = false;
        for (let i = 0; i < this.newRes.length; i++) {
          if (this.newRes[i].frag_cours === e.frag_cours.name) {
            this.newRes[i].ctrl_1 = e.note;
            f = true;
            break;
          }
        }
        if (!f) {
          this.newRes.push({
            note_pass: e.note_pass,
            note_total: e.note_total,
            frag_cours: e.frag_cours.name,
            coef: e.coef,
            ctrl_1: e.note,
            ctrl_2: 0,
            ctrl_3: 0,
            ctrl_4: 0,
            moy: 0,
            extra: 0,
          });
        }
      }
    });

   this.results[1].forEach((e) => {
      if (this.newRes.length === 0) {
        this.newRes.push({
          note_pass: e.note_pass,
          note_total: e.note_total,
          frag_cours: e.frag_cours.name,
          coef: e.coef,
          ctrl_1: 0,
          ctrl_2: e.note,
          ctrl_3: 0,
          ctrl_4: 0,
          moy: 0,
          extra: 0,
        });
      } else {
        let f = false;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.newRes.length; i++) {
          if (this.newRes[i].frag_cours === e.frag_cours.name) {
            this.newRes[i].ctrl_2 = e.note;
            f = true;
            break;
          }
        }
        if (!f) {
          // tslint:disable-next-line: max-line-length
          this.newRes.push({
            note_pass: e.note_pass,
            note_total: e.note_total,
            frag_cours: e.frag_cours.name,
            coef: e.coef,
            ctrl_1: 0,
            ctrl_2: e.note,
            ctrl_3: 0,
            ctrl_4: 0,
            moy: 0,
            extra: 0,
          });
        }
      }
    });
   this.results[2].forEach((e) => {
      if (this.newRes.length === 0) {
        // tslint:disable-next-line: max-line-length
        this.newRes.push({
          note_pass: e.note_pass,
          note_total: e.note_total,
          frag_cours: e.frag_cours.name,
          coef: e.coef,
          ctrl_1: 0,
          ctrl_2: 0,
          ctrl_3: e.note,
          ctrl_4: 0,
          moy: 0,
          extra: 0,
        });
      } else {
        let f = false;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.newRes.length; i++) {
          if (this.newRes[i].frag_cours === e.frag_cours.name) {
            this.newRes[i].ctrl_3 = e.note;
            f = true;
            break;
          }
        }
        if (!f) {
          // tslint:disable-next-line:max-line-length
          this.newRes.push({
            note_pass: e.note_pass,
            note_total: e.note_total,
            frag_cours: e.frag_cours.name,
            coef: e.coef,
            ctrl_1: 0,
            ctrl_2: 0,
            ctrl_3: e.note,
            ctrl_4: 0,
            moy: 0,
            extra: 0,
          });
        }
      }
    });
   this.results[3].forEach((e) => {
      if (this.newRes.length === 0) {
        // tslint:disable-next-line:max-line-length
        this.newRes.push({
          note_pass: e.note_pass,
          note_total: e.note_total,
          frag_cours: e.frag_cours.name,
          coef: e.coef,
          ctrl_1: 0,
          ctrl_2: 0,
          ctrl_3: 0,
          ctrl_4: e.note,
          moy: 0,
          extra: 0,
        });
      } else {
        let f = false;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.newRes.length; i++) {
          if (this.newRes[i].frag_cours === e.frag_cours.name) {
            this.newRes[i].ctrl_4 = e.note;
            f = true;
            break;
          }
        }
        if (!f) {
          // tslint:disable-next-line: max-line-length
          this.newRes.push({
            note_pass: e.note_pass,
            note_total: e.note_total,
            frag_cours: e.frag_cours.name,
            coef: e.coef,
            ctrl_1: 0,
            ctrl_2: 0,
            ctrl_3: 0,
            ctrl_4: e.note,
            moy: 0,
            extra: 0,
          });
        }
      }
    });

   if (this.results[4]) {


      this.results[4].forEach((e) => {
        if (this.newRes.length === 0) {
          // tslint:disable-next-line:max-line-length
          this.newRes.push({
            note_pass: e.note_pass,
            note_total: e.note_total,
            frag_cours: e.frag_cours.name,
            coef: e.coef,
            ctrl_1: 0,
            ctrl_2: 0,
            ctrl_3: 0,
            ctrl_4: 0,
            moy: 0,
            extra: e.note,
          });
        } else {
          let f = false;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.newRes.length; i++) {
            if (this.newRes[i].frag_cours === e.frag_cours.name) {
              this.newRes[i].extra = e.note;
              f = true;
              break;
            }
          }
          if (!f) {
            // tslint:disable-next-line: max-line-length
            this.newRes.push({
              note_pass: e.note_pass,
              note_total: e.note_total,
              frag_cours: e.frag_cours.name,
              coef: e.coef,
              ctrl_1: 0,
              ctrl_2: 0,
              ctrl_3: 0,
              ctrl_4: 0,
              moy: 0,
              extra: e.note,
            });
          }
        }
      });
    }
  }

  getSetTotal(o) {
     console.log(o);
    // tslint:disable-next-line:prefer-for-of
     for (let i = 0; i < o.length; i++) {
      //  CTRL_1
      const t1 = o[i].coef * o[i].ctrl_1;
      this.total.ctrl_1 += t1;
      //  CTRL_2
      const t2 = o[i].coef * o[i].ctrl_2;
      this.total.ctrl_2 += t2;
      //  CTRL_3
      const t3 = o[i].coef * o[i].ctrl_3;
      this.total.ctrl_3 += t3;
      //  CTRL_4
      const t4 = o[i].coef * o[i].ctrl_4;
      this.total.ctrl_4 += t4;
      //  CTRL_5.
      if ( o[i].note_pass > 0 && o[i].ctrl_4 < o[i].note_pass &&  this.etab.reprise === 1 &&   this.etab.type_reprise === 2 ) {
        const t6 = o[i].coef * o[i].ctrl_4;
        this.total.ctrl_5 += t6;
        // EXTRA
        const t7 = o[i].coef * o[i].extra;
        this.total.ctrl_6 += t7;
      }

      // MANAGE COEF
      const x = o[i].coef * o[i].note_total;
      this.total.coef += x;
      // MOY
      this.total.moy += this.getMoyAnn(o[i], this.etab.nbre_ctrl);
      // tslint:disable-next-line: triple-equals
      if (this.etab.type_reprise == 1 &&  this.etab.reprise == 1 ) {
        //  EXTRA
        const t5 = o[i].coef * o[i].extra;
        this.total.extra += t5;
      } else if (
               o[i].note_pass > 0 &&
               o[i].ctrl_4 < o[i].note_pass &&
               // tslint:disable-next-line: triple-equals
               this.etab.reprise == 1 &&
               // tslint:disable-next-line:triple-equals
               this.etab.type_reprise == 2
             ) {
               const t5 = o[i].coef * o[i].extra;
               this.total.extra += t5;
             }
    }


  }

  getMoyAnn(o, nc) {
    let t = o.coef * o.ctrl_1;
    t += o.coef * o.ctrl_2;
    t += o.coef * o.ctrl_3;
    t += o.coef * o.ctrl_4;
    return t / nc;
  }
  getMoy(o, nc) {
    let t = o[0] !== undefined ? o[0] * this.promo.moy_total : 0;
    t += o[1] !== undefined ? o[1] *    this.promo.moy_total : 0;
    t += o[2] !== undefined ? o[2] * this.promo.moy_total : 0;
    t += o[3] !== undefined ? o[3] * this.promo.moy_total : 0;
    return t / nc;
  }
  onKey(e: { target: { value: any } }) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
      this.STUDS = this.filterItems(query);
    } else {
      this.STUDS = this.HSTUDS;
    }
  }
  filterItems(searchTerm: string) {
    return this.STUDS.filter((item) => {
      return (
        item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_student.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }
}
