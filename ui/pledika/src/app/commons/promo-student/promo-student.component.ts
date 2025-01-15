import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-promo-student',
  templateUrl: './promo-student.component.html',
  styleUrls: ['./promo-student.component.css']
})
export class PromoStudentComponent implements OnInit {
  constructor(public studServ: StudentsService, private route: ActivatedRoute, private app: AppService) { }

  ID: any;
  IDF: any;
  PROMO: any;
  MPROMO: any;
  OP: any;
  option = [];
  response = { state: '', message: '', active: false };
  STUDS = [];
  loading = [];
  frag: any;
  HSTUDS: any[];
  iloading: boolean;
  msg=[];
  frags = [];

  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.IDF = this.route.snapshot.params.idf;
    this.getPromo();
     this.init();
  }

init() {
  this.getFrags();
  this.getParcours();
}
  changePage(id){
   this.IDF=id;
   this.init();
  }

  getPromo() {
    this.app.getData(`${environment.apiUrl}promotions/${this.ID}`)
      .pipe(first())
      .subscribe(
        data => {
          this.PROMO = data;
          this.getFrag(data._links.promofrag.href);
        },
        error => {
        }
      );
  }
  getFrag(url) {
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.frags = data._embedded.promoFrags;
        },
        error => {
        }
      );
  }

  getFrags() {
    this.app.getData(`${environment.apiUrl}promoFrags/${this.IDF}`)
      .pipe(first())
      .subscribe(
        data => {
          this.frag = data;
        },
        error => {
        }
      );
  }

  getParcours() {
    if (this.iloading) { return; }
    this.iloading = true;
    const url = `${environment.apiUrl}getAllParcoursByPromo/${this.IDF}`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.iloading = false;
          this.STUDS = data.data;
          this.HSTUDS = this.STUDS;
        },
        error => {
          this.iloading = false;
        }
      );
  }
  onKey(e: { target: { value: any; }; }) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
        this.STUDS = this.filterItems(query);

     } else {

      this.STUDS = this.HSTUDS;
    }
  }

  filterItems(searchTerm: string) {
    return this.STUDS.filter(item => {
      return item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_student.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  initResults() {
    if (this.iloading) { return; }
    this.iloading = true;
    this.app.getData(`${environment.apiUrl}addStudentToPromoFrag/${this.IDF}/${this.ID}`)
      .pipe(first())
      .subscribe(
        data => {
          this.iloading = false;
          this.app.getData(`${environment.apiUrl}getPars_cours/${this.IDF}`)
            .pipe(first())
            .subscribe(
              res => {
                this.iloading = false;
                this.STUDS = res.data;
                this.HSTUDS = this.STUDS;
              },
              error => {
                this.iloading = false;
              }
            );
        },
        error => {
          this.iloading = false;
        }
      );
  }

del(id: any, i: number) {
 if (this.iloading) { return; }
 this.iloading = true;
 this.app.delData(`${environment.apiUrl}parcours_frags/${id}`)
      .pipe(first())
      .subscribe(
        data => {
          this.iloading = false;
          this.STUDS.splice(i, 1);
          this.HSTUDS = this.STUDS;
        },
        error => {
          this.iloading = false;
        }
      );
}

setDisc(o, i){
  let DATA = {
   absence : o.absence,
   retard  : o.retard,
   note_1  : o.note_1,
   note_2  : o.note_2,
   mention : o.mention,
   };
  this.app.editData(`${environment.apiUrl}parcours_frags/${o.id}`, DATA)
    .pipe(first())
    .subscribe(
      data => {
        this.STUDS[i] = data;
        this.msg[i]="Modification effectuée avec succès";
      },
      error => {
        this.msg[i] = "Modification non effectuée";
      }
    );

}
}
