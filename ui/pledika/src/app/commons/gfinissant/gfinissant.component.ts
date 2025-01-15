import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-gfinissant',
  templateUrl: './gfinissant.component.html',
  styleUrls: ['./gfinissant.component.css']
})
export class GFinissantComponent implements OnInit {

  [x: string]: any;
  constructor(
    public app: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  response = { state: '', message: '', active: false };
  af: any;

  index: number;
  ID: any;

  newCours: any;
  hcours: any;

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
  ngOnInit() {
    this.getStudents();
  }

  change() {}
  addLO(idu, idp, i,s ) {
 if (this.loading[i]) {
      return;
    }
 this.loading[i] = true;
 this.app
      .getData( `${environment.apiUrl}setLO/${idu}/${idp}/${s}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.STUDS[i].lover = s;
          this.STUDS[i].actived = !s;
          this.loading[i] = false;
        },
        () => {this.loading[i] = false; }
      );
  }
  setMoyGen(){
     this.app
      .getData( `${environment.apiUrl}setMoyenGenFini`)
      .pipe(first())
      .subscribe(
        (data) => {
        },
        () => {}
      );
  }
  getStudents() {

    this.app
      .getData( `${environment.apiUrl}getStudentToOver`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.STUDS = data.data;
          this.HSTUDS = this.STUDS;
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

   closeOne(id, i, state) {
    if (this.mloading) {
       return;
    }
    this.mloading = true;
    this.response.active = false;
    this.app
      .getData(`${environment.apiUrl}closeOnePars/${id}/${state}`)
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
  }
  unCheckAll() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.STUDS.length; i++) {
      this.STUDS[i].isSelected = this.all;
      this.checkArray = [];
    }
  }
  async push(state) {

      this.mloading = true;
      for (let i = 0; i < this.STUDS.length; i++) {
        if (this.STUDS[i].isSelected) {
          await this.addLO(this.STUDS[i].id, this.STUDS[i].idp, i, state);
        }
      }
      this.mloading = false;
  }

}
