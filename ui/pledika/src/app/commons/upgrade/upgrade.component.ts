import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private app: AppService) { }
  ID: any;
  PROMO: any;
  NPROMO: any;
  STUDS: any;
  HSTUDS: any;
  OP: any;
  caf: any;
  cpromo;
  option = [];
  loading = [];
  afs = [];
  response = { state: '', message: '', active: false };
  checkArray = [];
  all = false;
// tslint:disable-next-line: member-ordering
  PROMOS = [];
  moption;
  mloading;

  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.init();
  }

init() {
  this.getPromo();

}
setPromo(id) {
 this.ID = id;
 this.afs = [];
 this.init();
}

setMoyGen() {
const url = `${environment.apiUrl}setMoyenGen/${this.ID}`;
this.app.getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
        },
        () => {}
      );
  }


setup(af) {
if (af.length > 0) {
  af.forEach(e => {
    if (!e.actived) {
      this.afs.push(e);
    }
  });
}
}



  tri(p) {
    p.forEach(e => {
      if (e.enabled) {
        this.PROMOS.push(e);
      }
    });
  }

  getPromo() {
    this.app
      .getData(`${environment.apiUrl}promotions/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.PROMO = data;
          this.getOP();
          if (data.next_promo == null) {
             this.getOtherPromo();
          }else{
             this.getStudents();
         }
        },
        () => { }
      );
  }

change() {}


save() {
  if (this.cpromo != null ) {
    this.updatePromo(this.cpromo);
  }
}
  getOP() {
    this.app
      .getData(
        `${environment.apiUrl}getOptionPaiement?code=${this.PROMO.code_cycle}`
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.OP = data.data;
        },
        (error) => { }
      );
  }

  updatePromo(p) {
    const POST = {
      next_promo: p.id,
      next_promo_name: p.code,
    };
    const url = `${environment.apiUrl}promotions/${this.PROMO.id}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.PROMO.next_promo = p.id;
          this.PROMO.next_promo_name = p.code;
          this.getStudents();
        },
        () => { }
      );
  }



  getOtherPromo() {
    this.app
      .getData(`${environment.apiUrl}getPromoToUpgrade/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.NPROMO = data.data;
        },
        () => { }
      );
  }

  close() {
    if (this.mloading) {
      return;
    }
    this.mloading = true;
    this.app
      .getData(`${environment.apiUrl}closeByPromo/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.mloading = false;
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message = data.message;
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

  getStudents() {
    this.app
      .getData(`${environment.apiUrl}getStudentToUpgrade/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.STUDS = data.data;
          this.HSTUDS = this.STUDS;
        },
        () => { }
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
dloading=[];
reAdd(o,p, i) {
console.log(o);
if (this.dloading[i]) {
      return;
    }
this.dloading[i] = true;
const url = `${environment.apiUrl}addStudentToSamePromo`;
const data = {
      id_opaie: p,
      id_student: o.id,
      id_promo: this.PROMO.id,
    };
this.app
      .setData(url, data)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response.active = true;
          this.dloading[i] = false;
          if (!data.crash) {
            this.STUDS.splice(i, 1);
            this.response.state = 'success';
            this.response.message = 'Cet(te) etudiant(e) refait la classe ';
            this.HSTUDS = this.STUDS;
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        (error) => {
          this.dloading[i] = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
        }
      );
}

    setMoy(a, b, c) {
      let r = (a / b);
      return (r*c).toFixed(2);
    }


  addSTP(s, o, i) {
    if (this.loading[i]) {
      return;
    }
    this.loading[i] = true;

    const data = {
      id_opaie: o,
      id_student: s.id,
      id_promo: this.PROMO.next_promo,
    };

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
      this.checkArray.push(e.target.value);
      this.STUDS[y].isSelected = true;
    } else {
      let i = 0;
      this.STUDS[y].isSelected = false;
      this.checkArray.forEach((item) => {
        if (item === e.target.value) {
          this.checkArray.splice(i, 1);
          return;
        }
        i++;
      });
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
      this.checkArray.push(this.STUDS[i].id);
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
}
