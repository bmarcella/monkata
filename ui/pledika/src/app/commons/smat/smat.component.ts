import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: "app-smat",
  templateUrl: "./smat.component.html",
  styleUrls: ["./smat.component.css"],
})
export class SmatComponent implements OnInit {
  profs: any;
  mats: any;
  cours: any;
  hcours: any;
  cmat: any;
  loading;
  option: any;
  options: any;
  mat: any = {
    coef: "",
    name: "",
    note_total: "",
    prof: "",
    mat: {},
    note_pass: 0,
    note_rep: 0,
    note_excel: 0,
  };
  response = { state: "", message: "", active: false };
  submitted = false;
  page: any;
  smat: any = {
    id:0,
    coef: "",
    name: "",
    note_total: "",
    code: "",
    mat: {},
    note_pass: 0,
    note_rep: 0,
    note_excel: 0,
  };
  constructor(public nServ: AppService) {}

  onChange(e) {
    this.cmat = e;
    this.mat.coef = e.coef;
    this.mat.note_total = e.note_total;
  }

  change() {}

  edit = false;
  pos=-1;
 onEdit(o,i){
  this.edit=true;
  this.smat = o;
  this.pos=i;
  window.scroll(0, 0);
  
 }

  ngOnInit() {
    this.getOptions();
    this.getMat();
    this.getCourses();
  }
  getOptions() {
    const url = `${environment.apiUrl}options`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.options = data._embedded.options;
        },
        (error) => {}
      );
  }

  del(a, i) {
    const url = `${environment.apiUrl}sMatieres/${a.id}`;
    this.nServ
      .delData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cours.splice(i, 1);
        },
        (error) => {}
      );
  }

  getMat() {
    const url = `${environment.apiUrl}matieres`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.mats = data._embedded.matieres;
        },
        (error) => {}
      );
  }

  getCourses() {
    const url = `${environment.apiUrl}sMatieres?size=1000`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cours = data._embedded.sMatieres;
          this.hcours = this.cours;
          console.log(data);
        },
        (error) => {}
      );
  }

  addCourse() {
    if (this.loading) {
      return;
    }
    this.mat.note_rep = parseInt(this.mat.note_rep);
    this.mat.note_pass = parseInt(this.mat.note_pass);
    this.mat.note_excel = parseInt(this.mat.note_excel);
    if (
      this.mat.note_rep > 0 &&
      this.mat.note_rep < this.mat.note_total &&
      this.mat.note_pass > 0 &&
      this.mat.note_pass < this.mat.note_total &&
      this.mat.note_excel > 0 &&
      this.mat.note_excel < this.mat.note_total
    ) {
      this.loading = true;
      const $POST = {
        code: `${this.mat.name}-${this.option.code}-${this.cmat.id}`,
        name: `${this.mat.name}`,
        coef: this.mat.coef,
        note_total: this.mat.note_total,
        matiere: `${environment.apiUrl}matieres/${this.cmat.id}`,
        option: this.option.code,
        note_rep: parseFloat(this.mat.note_rep),
        note_pass: parseFloat(this.mat.note_pass),
        note_excel: parseFloat(this.mat.note_excel),
      };

      const url = `${environment.apiUrl}sMatieres`;
      this.nServ
        .setData(url, $POST)
        .pipe(first())
        .subscribe(
          (data) => {
            this.loading = false;
            this.response.active = true;
            if (data != null) {
              this.response.state = "success";
              this.response.message = "Insertion affectuée avec succes";
              this.mat = {
                coef: "",
                name: "",
                note_total: "",
                prof: "",
                mat: {},
                note_pass: "",
                note_rep: "",
                note_excel: "",
              };
              this.cours.push(data);
            } else {
              this.response.state = "danger";
              this.response.message = "Erreur serveur";
            }
          },
          (error) => {
            this.response.active = true;
            this.response.state = "danger";
            this.response.message = error;
            this.loading = false;
          }
        );
    } else {
      this.response.active = true;
      this.response.state = "danger";
      this.response.message = "les notes sont incorrects";
      this.loading = false;
    }
  }

  editCourse() {

    let i = this.pos;
    let mat = this.smat;
    if (this.loading) {
      return;
    }
    console.log(mat);
    mat.note_rep = parseInt(mat.note_rep);
    mat.note_pass = parseInt(mat.note_pass);
    mat.note_excel = parseInt(mat.note_excel);
    if (
      mat.note_rep > 0 &&
      mat.note_rep < mat.note_total &&
      mat.note_pass > 0 &&
      mat.note_pass < mat.note_total &&
      mat.note_excel > 0 &&
      mat.note_excel < mat.note_total
    ) {
      this.loading = true;
      const $POST = {
        code: `${mat.code}`,
        name: `${mat.name}`,
        coef: mat.coef,
        note_total: mat.note_total,
        note_rep: parseFloat(mat.note_rep),
        note_pass: parseFloat(mat.note_pass),
        note_excel: parseFloat(mat.note_excel),
      };

      const url = `${environment.apiUrl}sMatieres/${mat.id}`;
      this.nServ
        .editData(url, $POST)
        .pipe(first())
        .subscribe(
          (data) => {
            this.loading = false;
            this.response.active = true;
            if (data != null) {
              this.response.state = "success";
              this.response.message = "Modification affectuée avec succes";
              this.edit=false;
              this.smat = {
                id: 0,
                coef: "",
                name: "",
                note_total: "",
                code: "",
                mat: {},
                note_pass: 0,
                note_rep: 0,
                note_excel: 0,
              };
              this.cours[i]=data;
            } else {
              this.response.state = "danger";
              this.response.message = "Erreur serveur";
            }
          },
          (error) => {
            this.response.active = true;
            this.response.state = "danger";
            this.response.message = error;
            this.loading = false;
          }
        );
    } else {
      this.response.active = true;
      this.response.state = "danger";
      this.response.message = "les notes sont incorrects";
      this.loading = false;
    }
  }

  onKey(e) {
    const query = e.target.value;
    if (query != null && query !== "" && query !== undefined) {
      this.cours = this.filterItems(query);
    } else {
      this.cours = this.hcours;
    }
  }

  filterItems(searchTerm) {
    return this.cours.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }
}
