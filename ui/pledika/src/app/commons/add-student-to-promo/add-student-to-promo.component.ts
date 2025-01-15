import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';

@Component({
  selector: 'app-add-student-to-promo',
  templateUrl: './add-student-to-promo.component.html',
  styleUrls: ['./add-student-to-promo.component.css'],
})
export class AddStudentToPromoComponent implements OnInit {
  ID: any;
  PROMO: any;
  MPROMO: any;
  OP: any;
  option = [];
  loading = [];
  dloading = [];
  response = { state: '', message: '', active: false };
  STUDS = [];
  HSTUDS: any[];
  hp: any;
  husers: any;
  rapp: any;
  constructor(
    public studServ: StudentsService,
    private route: ActivatedRoute,
    private app: AppService
  ) {}
  page = 0;
  mpage = 1;
  // tslint:disable-next-line: no-inferrable-types
  size: number = 10;
  users: any;
  p: any;
  tp = [];
  rtp;
  msg = [];
  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.getPromo(this.ID);
    this.getParcours();
    this.getStat();
  }

  getStat() {
    this.app
      .getData(`${environment.apiUrl}getrPaiementPromo/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.rapp = data.data;
        },
        () => { }
      );
  }

  setED(){
  this.mpage=0;
  this.getAll();
}

  getPromo(ID) {
    this.app
      .getData(`${environment.apiUrl}promotions/${ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.PROMO = data;
          this.getOP();
        },
        (error) => {}
      );
  }
  setDisc(o, i) {
    let DATA = {
      mention: o.mention,
    };
    this.app
      .setData(`${environment.apiUrl}setMentionPars/${o.id}`, DATA)
      .pipe(first())
      .subscribe(
        (data) => {
         if(!data.crash){
            this.STUDS[i] = data.data;
            this.msg[i] = data.message;
          }
        },
        (error) => {
          this.msg[i] = 'Modification non effectuée';
        }
      );
  }

  getParcours() {
    this.app
      .getData(`${environment.apiUrl}getParcours/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.STUDS = data.data;
          this.HSTUDS = this.STUDS;
        },
        (error) => {}
      );
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
          // console.log(data);
        },
        (error) => {}
      );
  }

  getDate(d) {
    if (d != null) {
      return d.split('T')[0];
    }
    return 'non mentioné';
  }

  onKeyV2(e) {
    const query = e.target.value;
    if (query != null && query != '' && query != undefined) {
      this.users = this.filterItemsV2(query);
    } else {
      this.users = this.husers;
    }
  }

  filterItemsV2(searchTerm) {
    return this.users.filter((item) => {
      return (
        item.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.classe.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }

  getAll() {
    //const url = `${environment.apiUrl}etudiants?size=${this.size}&page=${this.page}`;
    const url = `${environment.apiUrl}getStudentForPromoV6/${this.ID}`;
    this.studServ
      .getAll(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.users = data.data;
          this.husers = this.users;
        },
        (error) => {}
      );
  }

  setPage(j) {
    this.tp = [];
    this.rtp = j;
    for (let i = 1; i <= j; i++) {
      this.tp.push({ page: i });
    }
  }

  remSTP(o, i) {
    if (this.dloading[i]) {
      return;
    }
    this.dloading[i] = true;
    const url = `${environment.apiUrl}delStudentToPromo/${o.id}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response.active = true;
          if (!data.crash) {
            this.dloading[i] = false;
            this.delOne(o.id);
         //   this.STUDS.splice(i, 1);
            this.response.state = 'success';
            this.response.message = 'Etudiant(e) supprimé(e)';
          } else {
            this.response.state = 'danger';
            this.response.message = 'erreur serveur';
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

  delOne(id){
    for (let i = 0; i < this.HSTUDS.length;i++){
         if(id==this.HSTUDS[i].id){
           this.HSTUDS.splice(i, 1);
         }
    }
  }

  addSTP(s, o, i) {
    if (this.loading[i]) {
      return;
    }
    this.loading[i] = true;

    const data = {
      id_opaie: o,
      id_student: s.id,
      id_promo: this.ID,
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
            this.response.message = 'succès';
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

  search = false;
  onKeyUp(e) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
      this.search = true;
      this.STUDS = this.filterItems(query);
    } else {
      this.search = false;
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
}
