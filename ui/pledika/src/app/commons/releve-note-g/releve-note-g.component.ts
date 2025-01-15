import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-releve-note-g',
  templateUrl: './releve-note-g.component.html',
  styleUrls: ['./releve-note-g.component.css']
})
export class ReleveNoteGComponent implements OnInit {

  IDP: any;
  POS: number;
  promo: any;
  afs: any;
  cyear;
  cpromo;
  promos: any;
  pfrags: any;
  cpfrag;
  cuser: any;
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
  // tslint:disable-next-line:variable-name
  pf: any;
  moy = 1;
  users: any;
  rper = [];
  user;
  parcours = [];

  // tslint:disable-next-line:member-ordering
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

  periods: any;

  NB: any;
  initb: boolean;
  CT: number;
  newRes: any;
  aResults = [];
  line: {
    note_pass: number;
    note_total: number;
    frag_cours: string;
    coef: number;
    moy: number;
    extra: number;
  };

  nper = [];
  mg = false;

  getAcad() {
    const url = `${environment.apiUrl}promo_afs?size=1000`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          this.afs = data._embedded.promo_afs;
        },
        (error) => {}
      );
  }
  getYear(a) {
    this.cpromo = undefined;
    this.promos = undefined;
    this.pfrags = undefined;
    this.cpfrag = undefined;
    this.STUDS = [];
    this.HSTUDS = [];
    this.getPromo(a._links.promotion.href);
  }

  getCPromo(a) {
    this.promo = a;
    this.cpromo = a;
    this.pfrags = undefined;
    this.cpfrag = undefined;
    this.cuser =  undefined;
    this.STUDS = [];
    this.HSTUDS = [];
    this.getLParcours(a._links.parcours.href);
  }

getLParcours(url) {
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.iloading = false;
          this.STUDS = data._embedded.parcourses;
          this.HSTUDS = this.STUDS;
        },
        (error) => {
        }
      );
  }

 getPromo(url) {
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.promos = data._embedded.promotions;
        },
        (error) => {}
      );
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

  setPrint() {
    const u: { print: 0 } = this.STUDS[this.POS];
    u.print++;
    const DATA = {
      print: u.print,
    };
    this.app
      .editData(`${environment.apiUrl}parcours_frags/${this.ID}`, DATA)
      .pipe(first())
      .subscribe(
        (data) => {
          this.STUDS[this.POS] = data;
        },
        (error) => {}
      );
  }


  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.POS = -1;
    this.getEtabInfo();
    this.getAcad();
  }
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

  setPage(idu) {
    this.ID = idu;
  }

  changePage(o, i) {
   const idu = o.id;
   this.ID = idu;
   this.POS = i;
   this.nper = [];
   this.parcours = [];
   this.cuser = o;
   this.getParcours(this.cpromo.id, idu);
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

  getParcours(idp, idu) {
    this.app.getData(`${environment.apiUrl}resultsForOBG/${idp}/${idu}`) .pipe(first()).subscribe(
        (data) => {
         console.log(data);
         this.setData(data.data, idu);
        },
        (error) => {
        }
      );
  }

  setData(data: any, idu) {
    this.iloading = false;
    this.periods = data.promofrag;
    this.users = data.parcours;
    this.startArrange(data.results, idu);
  }
  startArrange(data: any, idu) {
    this.aResults = data;
    // tslint:disable-next-line:forin
    for (const i in this.periods) {
         this.periods[i].share_code = this.arrangeShareCode(this.periods[i].share_code);
         this.periods[i].share_code = this.periods[i].share_code.replace(' ', '_');
         this.nper.push(this.periods[i].share_code);
         this.rper.push(this.periods[i]);
        // this.getMoyGen(i, i);
    }

    this.CreateOneBT(this.aResults[idu], idu);
    this.mg = true;
  }

  CreateOneBT(results, id) {
    /// console.log(results);
    const line = this.getLine();
    const total = { coef: 0, moy: 0 };
    const newRes = [];
    // tslint:disable-next-line:forin
    for (const i in results) {
      results[i].forEach((e) => {
        console.log(e);
        const note = (e.note !== '' && e.note != null && e.note !== undefined) ? e.note : 0 ;
        if (newRes.length === 0) {
          newRes.push({
            note_pass:  e.note_pass,
            note_total: e.note_total,
            frag_cours: e.frag_cours.name,
            coef: e.coef,
            [this.periods[i].share_code]: note,
            moy: 0,
            extra: 0,
            moy_ann: 0,
          });
          // total.coef += e.coef;
          total[this.periods[i].share_code] = 0;
        } else {
          let f = false;
          // tslint:disable-next-line:prefer-for-of
          for (let j = 0; j < newRes.length; j++) {
            if (newRes[j].frag_cours === e.frag_cours.name) {
              newRes[j][this.periods[i].share_code] = note;
              // total.coef += e.coef;
              total[this.periods[i].share_code] = 0;
              f = true;
              break;
            }
          }
          if (!f) {
            newRes.push({
              note_pass: e.note_pass,
              note_total: e.note_total,
              frag_cours: e.frag_cours.name,
              coef: e.coef,
              [this.periods[i].share_code]: note,
              moy: 0,
              extra: 0,
              moy_ann: 0,
            });
            // total.coef += e.coef;
            total[this.periods[i].share_code] = 0;
          }
        }
      });
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < newRes.length; i++) {
      let t = 0;
      // tslint:disable-next-line:forin
      for (const j in this.periods) {
        t += (newRes[i][this.periods[j].share_code]) ? newRes[i][this.periods[j].share_code] : 0;
        total[this.periods[j].share_code] += (newRes[i][this.periods[j].share_code]) ? newRes[i][this.periods[j].share_code] : 0;
      }
      newRes[i].moy_ann = (t / this.nper.length).toFixed(2);
      total.coef += newRes[i].coef * newRes[i].note_total;
      total.moy += newRes[i].coef * newRes[i].moy_ann;
    }
    // tslint:disable-next-line:prefer-for-of
    this.user = { cpars: this.users[id], total, results: newRes };
  }

  getMoyAnn(o) {
    return o.moy_ann / this.periods.length;
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



  getMoy(moy, promo, nper, periods) {
    let t = 0;
    // tslint:disable-next-line:forin
    for (const i in this.periods) {
      t +=
        moy[periods[i].id] !== undefined
          ? moy[periods[i].id] * promo.moy_total
          : 0;
    }
    const r = t / nper.length;
    return r;
  }

  setText(p) {
    return p.replace('_', ' ').substring(0, 5);
  }

  getLine() {
    const line = {
      note_pass: 0,
      note_total: 0,
      frag_cours: '',
      coef: 0,
      moy: 0,
      extra: 0,
      moy_ann: 0,
    };
    // tslint:disable-next-line:forin
    for (const i in this.periods) {
      line[this.periods[i].share_code] = 0;
    }
    return line;
  }
  getDec(moy_accept, moy, rep, ir, tr) {
    if (moy >= moy_accept) {
      return 'L\'élève est promu en classe superieur avec une moyenne de ' + moy;
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
                'Après une reprise l\'élève est promu en classe superieur avec la moyenne de ' +
                rep
              );
            }
          } else {
            return 'L\'élève doit refaire la classe';
          }
        } else {
          return 'L\'élève doit refaire la classe';
        }
      }
    }
  }

  arrangeShareCode(code) {
    const i = parseInt(code[0]);
    if (i === 1) {
     return code;
    }
    return i + 'eme ' + this.etab.frag_name;
  }

}
