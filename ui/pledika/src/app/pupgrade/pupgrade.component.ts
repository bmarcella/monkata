import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AppService } from '../_Services/app.service';

@Component({
  selector: 'app-pupgrade',
  templateUrl: './pupgrade.component.html',
  styleUrls: ['./pupgrade.component.css'],
})
export class PupgradeComponent implements OnInit {
  [x: string]: any;
  constructor(
    public app: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  response = { state: '', message: '', active: false };
  af: any;
  apromo = [];
  ppromo;
  cpromo = {
    max_student: 100,
    promofrag: [],
    moy_accept: 0,
    moy_exc: 0,
    moy_reprise: 0,
    moy_total: 0,
    prog_id: 0,
    id: 0,
    code: '',
    code_niveau: '',
  };
  tpromo: number;
  index: number;
  ID: any;
  PROMO: any;
  PROMOS = [];
  newCours: any;
  hcours: any;
  afrags = [];
  nfrags = [];
  hpars;
  profs;
  cprof;
  loading = [];
  floading = [];
  ready = false;
  iloading = false;
  OP = [];
  frags: any;
  option = [];
  moption;
  all = false;
  pars = [];

  see = [];

  msg = [];
  err = [];
  mloading;
  STUDS: any;
  HSTUDS: any;
  over = false;
  year = false;
 ix = -1;
lpromo = false;
  ngOnInit() {
    this.countAF();
  }
  countAF() {
    const url = `${environment.apiUrl}checkAF`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          if (!data.crash && data.data) {
            this.getAF();
          } else {
            this.year = true;
          }
        },
        (error) => {
         this.router.navigate(['/app/management']);
        }
      );
  }
  getAF() {
    const url = `${environment.apiUrl}getPromoByAF`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.over = true;
          if (!data.crash) {
            this.apromo = data.data;
            this.tpromo = this.apromo.length;
            if (this.tpromo > 0) {
            this.index = 1;
            this.ix = 0;
            this.arrange();
            }
          }
        },
        (error) => {
          this.router.navigate(['/app/management']);
        }
      );
  }
  next() {
    this.index++;
    this.arrange();
  }
  prev() {
    --this.index;
    this.arrange();
  }
  arrange() {
    this.pars = [];
    this.frags = [];
    this.option = [];
    this.ppromo = null;
    this.ready = false;
    this.ix = this.index - 1;
    const cpromo = this.apromo[this.ix];
    this.ID = cpromo.id;
    this.PROMO = cpromo;
    window.scroll(0, 0);
    this.cpromo = this.PROMO;
    this.STUDS = [];
    this.HSTUDS = [];
    this.getOP();
    if (this.PROMO.prev_promo === null || this.PROMO.prev_promo === '') {
       this.getPromoPrev(this.ID);
     } else {
      this.ready = true;
      this.getStudents();
   }
  }
 getCPromo(p) {
    this.index = p + 1;
    this.pars = [];
    this.frags = [];
    this.option = [];
    this.ppromo = null;
    this.ready = false;
    const cpromo = this.apromo[p];
    this.ID = cpromo.id;
    this.PROMO = cpromo;
    this.cpromo = this.PROMO;
    this.STUDS = [];
    this.HSTUDS = [];
    this.getOP();
    if (this.PROMO.prev_promo == null || this.PROMO.prev_promo === '') {
       this.getPromoPrev(this.ID);
     } else {
      this.ready = true;
      this.getStudents();
   }
  }

  setMoy(a, b, c) {
    let r = (a / b).toFixed(2);

    return (parseFloat(r)*c).toFixed();
  }

 change() {}

  getStudents() {
    this.app
      .getData( `${environment.apiUrl}getStudentToUpgrade/${this.PROMO.prev_promo}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.STUDS = data.data;
          this.HSTUDS = this.STUDS;
        },
        () => {}
      );
  }

  getPromoPrev(ID) {
    this.app
      .getData(`${environment.apiUrl}getPromoPrev/${ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.PROMOS = data.data;
        },
        () => {}
      );
  }
  init() {
    this.PROMOS = [];
    this.pars = [];
    this.option = undefined;
    window.scroll(0, 0);
  }
  setPromoPrev(p) {
    if (this.iloading) {
      return;
    }
    this.iloading = true;
    this.app
      .getData(
        `${environment.apiUrl}progression/${this.PROMO.id}/${p.id}`
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.iloading = false;
          if (!data.crash) {
          this.PROMO.prev_promo = p.id;
          this.PROMO.prev_promo_name = p.code;
          this.ready = true;
          this.getStudents();
          }
        },
        () => {
          this.iloading = false;
        }
      );
  }

  resetProg() {
    if (this.iloading) {
      return;
    }
    this.iloading = true;
    this.app
      .getData(
        `${environment.apiUrl}resetProg/${this.PROMO.id}`
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.iloading = false;
          if (!data.crash) {
            this.PROMO.prev_promo = null;
            this.PROMO.prev_promo_name = null;
            this.ready = false;
          }
        },
        () => {
          this.iloading = false;
        }
      );
  }
  getOP() {
    this.app
      .getData(
        `${environment.apiUrl}getOptionPaiement?code=${this.PROMO.code_cycle}` )
      .pipe(first())
      .subscribe(
        (data) => {
          this.OP = data.data;
        },
        (error) => {}
      );
  }
  close() {
    if (this.mloading) {
      return;
    }
    this.mloading = true;
    this.response.active = false;
    this.app
      .getData(`${environment.apiUrl}closeByPromo/${this.PROMO.id}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.mloading = false;
          this.response.active = true;
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message = data.message;
            this.STUDS = [];
            this.HSTUDS = this.STUDS;
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.mloading = false;
        }
      );
  }
   closeOne(code, i, state) {
    if (this.mloading) {
      return;
    }
    this.mloading = true;
    this.response.active = false;
    this.app
      .getData(`${environment.apiUrl}closePars/${this.PROMO.id}/${code}/${state}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.mloading = false;
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message = data.message;
            this.STUDS[i].actived = state;
            this.HSTUDS = this.STUDS;
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.mloading = false;
        }
      );
  }
  onKeyUp(e) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
      this.STUDS = this.filterItems(query);
    } else {
      this.STUDS = this.HSTUDS;
    }
  }

  filterItems(searchTerm) {
    return this.STUDS.filter((item) => {
      return (
        item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_student.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }

  addSTP(s, o, i) {
    if (this.loading[i]) {
      return;
    }
    this.loading[i] = true;

    const data = {
      id_opaie: o,
      id_student: s.id,
      id_promo: this.PROMO.id,
    };
    this.response.active = false;
    const url = `${environment.apiUrl}addStudentToPromo`;
    this.app
      .setData(url, data)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading[i] = false;
          this.response.active = true;
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message = 'Etudiant admis en classe supérieure';
            const user = data.data;
            this.STUDS.splice(i, 1);
            this.HSTUDS = this.STUDS;
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.loading[i] = false;
        }
      );
  }
  onCheckboxChange(e, y) {
    if (e.target.checked) {
    //  this.checkArray.push(e.target.value);
      this.STUDS[y].isSelected = true;
    } else {
      let i = 0;
      this.STUDS[y].isSelected = false;
      // this.checkArray.forEach((item) => {
        // if (item === e.target.value) {
          // this.checkArray.splice(i, 1);
          // return;
        // }
        // i++;
      // });
    }
    console.log(this.checkArray);
    this.isAllSelected();
  }
  onCheckboxChangeAll(e) {
    if (e.target.checked) {
      this.all = true;
      this.checkAll();
    } else {
      this.all = false;
      this.unCheckAll();
    }
  }

  isAllSelected() {
    this.all = this.STUDS.every(function(item: any) {
      return item.isSelected === true;
    });
  }

  checkAll() {
    this.unCheckAll();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.STUDS.length; i++) {
      this.STUDS[i].isSelected = this.all;
     // this.checkArray.push(this.STUDS[i].id);
    }
    console.log(this.checkArray);
  }
  unCheckAll() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.STUDS.length; i++) {
      this.STUDS[i].isSelected = this.all;
      this.checkArray = [];
    }
    console.log(this.checkArray);
  }
  async push() {
    if (this.moption != null) {
      this.mloading = true;
      for (let i = 0; i < this.STUDS.length; i++) {
        if (this.STUDS[i].isSelected) {
          await this.addSTP(this.STUDS[i], this.moption, i);
        }
      }
      this.mloading = false;
    }
  }
 genPromo() {
if (!this.lpromo) {
  this.lpromo = true;
  this.response.active = false;
  this.app.getData(`${environment.apiUrl}genPromo`)
      .pipe(first())
      .subscribe(
        data => {
          this.lpromo = false;
          this.response.active = true;
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message = data.message;
            this.over = false;
            this.getAF();
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        error => {
          this.lpromo = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
        }
      );
}

  }

setMoyGen() {
const url = `${environment.apiUrl}setMoyenGen/${this.PROMO.prev_promo}`;
console.log(url);
this.app.getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
        },
        () => {}
      );
  }
}
