import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';;
import { type } from 'os';

@Component({
  selector: 'app-config-cours',
  templateUrl: './config-cours.component.html',
  styleUrls: ['./config-cours.component.css'],
})
export class ConfigCoursComponent implements OnInit {
  // /////
  ID: BigInteger;
  cours: any;
  //
  response: any = [];
  ceprof = [];
  index = 0;
  emat: any = [{
    id: 0,
    coef: '',
    name: '',
    note_total: '',
    prof: '',
    mat: {},
    note_pass: 0,
    note_rep: 0,
    note_excel: 0,
    _links: {},
    book_name: '',
    option: '',
    mprof_id: '',
    matiere_id:''
  }];
  esprof = [];
  loading : Array<boolean> = [];
  smat: any;
  cemat: any = [];
  esmat: any = [];
  profs : any = [];
  cp: any = [];
  courses: any;
  tcours = 0;
  html = '';
  result = '';
  hcourses: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    public studServ: StudentsService,
    public app: AppService
  ) {
  }

  read() {

  }

  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.getProf();
  }

  getCourses() {
    const url = `${environment.apiUrl}courses/?size=1000&option&sort=code,asc`;
    console.log(url);
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.courses = data._embedded.courses;
          this.hcourses = this.courses;
          this.tcours = this.courses.length;
          this.init();
          // console.log(this.courses);
        },
        (error) => {}
      );
  }

  init() {
    for (let i = 0; i < this.courses.length; i++) {
      this.response[this.courses[i].id] = { active: false, message:"", state: ""};
    }
  }

  onEditChange(i,e) {
    this.cemat[i] = e;
    // console.log(this.cemat[i]);

  }

   onEditChangeProf(i, e) {
    this.ceprof[i] = e;
    // console.log(this.ceprof[i]);
  }

setupCours () {
    const url = `${environment.apiUrl}setupCours`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
        },
        (error) => {}
      );
  }

  getSMatieres() {
    const url = `${environment.apiUrl}sMatieres/?size=1000&sort=code,asc`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.smat = data._embedded.sMatieres;
          this.getCourses();
        },
        (error) => {}
      );
  }

  getProf() {
    const url = `${environment.apiUrl}getProfForCours`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.profs = data.data;
          this.getSMatieres();
        },
        (error) => {}
      );
  }

  getCurrentprof(i, emat) {
    for (let i = 0; i < this.profs.length; i++) {
     if(this.profs[i].id == emat.mprof_id){
        return  this.profs[i].firstName+" " + this.profs[i].lastName + "(" + this.profs[i].id + ")";
      }
    }
    return "non mentionné";
  }


  editCourse(i, emat) {
    this.emat = emat;
    if (this.loading[i]) {
      return;
    }
    this.emat.note_rep = parseInt(this.emat.note_rep);
    this.emat.note_pass = parseInt(this.emat.note_pass);
    this.emat.note_excel = parseInt(this.emat.note_excel);
    if (
      this.emat.note_rep > 0 &&
      this.emat.note_rep < this.emat.note_total &&
      this.emat.note_pass > 0 &&
      this.emat.note_pass < this.emat.note_total &&
      this.emat.note_excel > 0 &&
      this.emat.note_excel < this.emat.note_total
    ) {
      this.loading[i] = true;

      const $POST = {
        name: `${this.emat.name}`,
        coef: this.emat.coef,
        code: `${this.emat.name}-${this.emat.option}-${this.emat.mprof_id}-${this.emat.matiere_id}`,
        note_total: this.emat.note_total,
        book_name: this.emat.book_name,
        matiere_id: this.emat.matiere_id,
        mprof_id: this.emat.mprof_id,
        prof: `${environment.apiUrl}userEntities/${this.emat.mprof_id}`,
        smatiere: `${environment.apiUrl}sMatieres/${this.emat.matiere_id}`,
        note_rep: parseFloat(this.emat.note_rep),
        note_pass: parseFloat(this.emat.note_pass),
        note_excel: parseFloat(this.emat.note_excel),
      };
      const url = `${environment.apiUrl}courses/${this.emat.id}`;
      this.app
        .editData(url, $POST)
        .pipe(first())
        .subscribe(
          (data) => {
             this.loading[i] = false;
             this.response[emat.id].active = true;
            if (data != null) {
              this.emat = data;
              this.response[emat.id].state = 'success';
              this.response[emat.id].message = 'Modification affectuée avec succes';
            } else {
              this.response[emat.id].state = 'danger';
              this.response[emat.id].message = 'Erreur serveur';
            }
          },
          (error) => {
            this.response[emat.id].active = true;
            this.response[emat.id].state = 'danger';
            this.response[emat.id].message = error;
            this.loading[i] = false;
          }
        );
    } else {
      this.response[emat.id].active = true;
      this.response[emat.id].state = 'danger';
      this.response[emat.id].message = 'les notes sont incorrects';
      this.loading[i] = false;
    }
  }

  editsMat(i) {
    this.esmat[i] = true;
  }

  closesMat(i) {
    this.esmat[i] = false;
  }

  onKey(e) {
    if (this.courses.length>1) {
    const query = e.target.value;
    if (query != null && query !== "" && query !== undefined) {
      this.courses = this.filterItems(query);
    } else {
      this.courses = this.hcourses;
    }
   }
  }

  filterItems(searchTerm) {
    return this.courses.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }

}
