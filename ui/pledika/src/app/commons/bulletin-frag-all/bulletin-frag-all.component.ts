import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-bulletin-frag-all',
  templateUrl: './bulletin-frag-all.component.html',
  styleUrls: ['./bulletin-frag-all.component.css'],
})
export class BulletinFragAllComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document,
    private router: Router,
    private route: ActivatedRoute,
    private app: AppService,
    public studServ: StudentsService
  ) {}
  IDP: any;
  POS: number;
  promo: any;
  STUDS: any;
  edit = false;
  note = [[]];
  msg = [];
  err = [];
  loading: boolean;
  HSTUDS: any;
  iloading: boolean=false;
  mot="Mention";
  mot2="Remarque";
  etab: any;
  ID: any;
  IDF: any;
  USER: any;
  parent=false;
  results: any = [];
   ALL:[{ctotal:any,ntotal:any, user:any, moy:any }]
  // tslint:disable-next-line:variable-name
  total = { note: 0, coef: 0 };

  // tslint:disable-next-line:variable-name
  pf: any;
  moy = 1;

  coef = 0;
  dec = true;
  mg = [];
  umg ;
  tcoef = "Coéficients";
  tnote = "Notes";
  tmat: any = "Matieres";
  ngOnInit() {
    this.IDF = this.route.snapshot.params.idf;
    this.POS = -1;
    this.IDP = this.route.snapshot.params.idp;
    this.init();
  }
  setBG(o) {
    // tslint:disable-next-line:triple-equals
    if (o == this.ID) {
      return '#34c929';
    }
    return '';
  }


  pageH=[];

  getHeight() {



    let i = 0;
    this.ALL.forEach((o) => {

      let el = this.document.getElementById(`USER-${o.user.id}`) as HTMLElement;
      if (el!=null && el!=undefined) {
        this.pageH[i]=el.offsetHeight;
         i++
      }
    });

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

  changePage(idu, idf, i) {
    this.ID = idu;
    this.POS = i;
  }

  init() {
    this.total = { note: 0, coef: 0 };
    this.getEtabInfo();
    this.getParcours();
    this.getPROMO();
    this.getMoyGen();
  }



  work() {
    this.total = { note: 0, coef: 0 };
    this.getResult();
    this.getPF();
  }

  getPF() {
    this.app
      .getData(`${environment.apiUrl}promoFrags/${this.IDF}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.pf = data;
        },
        (error) => {}
      );
  }
getMoyGen() {
if (this.iloading) {
  return;
}
this.iloading = true;
this.app
      .getData(`${environment.apiUrl}getMoyGenFrag/${this.IDF}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.moy = data;
          this.iloading = false;
          this.rprint = true;
        },
        (error) => {this.iloading = false; }
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

  getPROMO() {
    this.app
      .getData(`${environment.apiUrl}promotions/${this.IDP}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.promo = data;
        },
        (error) => {}
      );
  }

  getResult() {
    this.app
      .getData(`${environment.apiUrl}getBulletinFrag/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.results = data.data;
          this.getSetTotal(this.results);
        },
        (error) => {}
      );
  }

  getSetTotal(o) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < o.length; i++) {
      const t = o[i].coef * o[i].note;
      this.total.note += t;
      const x = o[i].coef * o[i].note_total;
      this.total.coef += x;
    }
  }

  getTotalCoef(o) {
    // tslint:disable-next-line:prefer-for-of
    if (this.coef === 0) {
      for (let i = 0; i < o.length; i++) {
        const x = o[i].coef * o[i].note_total;
        this.coef += x;
      }
    }
    return this.coef;
  }

  getTotalNote(o) {
    // tslint:disable-next-line:prefer-for-of
    let total = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < o.length; i++) {
      const t = o[i].coef * o[i].note;
      total += t;
    }
    return total;
  }

  getParcours() {
    if (this.iloading) {
      return;
    }
    this.iloading = true;
    const url = `${environment.apiUrl}getPars_cours/${this.IDF}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.iloading = false;
          this.STUDS = data.data;
          this.HSTUDS = this.STUDS;
          this.setALL();
        },
        (error) => {
          this.iloading = false;
        }
      );
  }

rprint = false;

 setALL(){
     this.ALL = this.STUDS.map((e) => {
     const tn = this.getTotalNote(e.results);
     const tc = this.getTotalCoef(e.results);
     const moy = this.getMoy(tn, tc, this.promo.moy_total).toFixed(2);
     return {
            ctotal: tc,
            ntotal: tn,
            user:e,
            moy: moy,
          };
        });
     this.order();
  }
setMarge(m){
  this.STUDS.map((e) => {
       this.mg[e.id] = m;
  });
  this.getHeight();
}

  order(){
    this.ALL.sort(function (a, b) { return b.moy - a.moy });
    this.getHeight();
  }

  getMoy(a, b, c) {
    return (a / b) * c;
  }
  editNote(item) {
    this.msg[item.id] = null;
    this.err[item.id] = null;
    // tslint:disable-next-line: radix
    if (parseInt(item.note) <= parseInt(item.note_total)) {
      this.loading = true;
      const $_POST = {
        note: item.note,
      };
      this.app
        .editData(`${environment.apiUrl}resultses/${item.id}`, $_POST)
        .pipe(first())
        .subscribe(
          (data) => {
            // console.log(data);
            this.msg[item.id] =
              ' La nouvelle note ' +
              ' est ' +
              item.note +
              '/' +
              item.note_total;
          },
          (error) => {
            this.err[item.id] = error;
          }
        );
    } else {
      this.err[item.id] =
        'La note doit être inferieur a ' + item.note_total + ' ';
    }
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
