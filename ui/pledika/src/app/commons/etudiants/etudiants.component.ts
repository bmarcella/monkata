import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AppService } from 'src/app/_Services/app.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css'],
})
export class EtudiantsComponent implements OnInit {
  constructor(public studServ: StudentsService, public nServ: AppService) {}
  totalE: any;
  nusers = [];
  husers: any[];
  hnusers = [];
  loading: any;
  cusers = [];
  hcusers = [];
  cquery: any;
  classe;
  NIV = [];
  page = 0;
  // tslint:disable-next-line: no-inferrable-types
  size: number = 50;
  users = [];
  p: any;
  tp = [];
  rtp;
  query;
  nquery;
  method = 0;
  Qsearch = false;

  iusers = false;
  search;

  response = { state: '', message: '', active: false };
  ngOnInit() {
    this.getClasse();
  }
  getClasse() {
    const url = `${environment.apiUrl}niveaus?size=1000`;
    // let url = `${environment.apiUrl}promotions/search`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.NIV = data._embedded.niveaus;
        },
        (error) => {}
      );
  }

  setNiv(c) {

    this.classe = c;
    this.getStudent(c.code);
    this.method = 1;
  }

  setNivName(c) {
   if (c !== '') {
      this.Qsearch = true;
      this.getStudentByName(c);
      this.method = 2;
      console.log(this.Qsearch);
    }
  }
  init() {
    this.classe = undefined;
    this.method = 0;
  }
  getDate(d) {
    if (d != null) {
      return d.split('T')[0];
    }
    return 'non mentioné';
  }
  getStudent(code) {
    const url = `${environment.apiUrl}getUserV3/STUDENT/${code}`;
    this.studServ
      .getAll(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.setupUser(data.data);
          console.log(data);
        },
        (error) => {}
      );
  }

  getStudentByName(code) {
    this.Qsearch = true;
    const url = `${environment.apiUrl}getUserV4/STUDENT/${code}`;
    this.studServ
      .getAll(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.setupUser(data.data);
          this.classe = code;
          this.Qsearch = false;
        },
        (error) => {
          this.Qsearch = false;
        }
      );
  }

  syncEtudiants() {
    const url = `${environment.apiUrl}syncEtudiant`;
    this.studServ
      .getAll(url)
      .pipe(first())
      .subscribe(
        (data) => {
        },
        (error) => {
        }
      );
  }

  setupUser(array) {
    array.forEach((e) => {
      if (e.current_promo != null && e.current_promo !== '') {
        if (e.enabled) {
          this.users.push(e);
        } else {
          this.nusers.push(e);
        }
      } else {
        this.cusers.push(e);
      }
    });
    this.husers = this.users;
    this.hnusers = this.nusers;
    this.hcusers = this.cusers;
    this.iusers = true;
  }

  activer(o, state, id, i) {
    if (!this.loading) {
      this.loading = true;
      const url = `${environment.apiUrl}editEtat/${id}/${state}`;
      this.nServ
        .getData(url)
        .pipe(first())
        .subscribe(
          (data) => {
            this.response.active = true;
            this.loading = false;
            this.response.message = data.message;
            if (!data.crash) {
              o.enabled = state;
              this.users.push(o);
              this.husers = this.users;
              this.nusers.splice(i, 1);
              this.hnusers = this.nusers;
              this.response.state = 'success';
            } else {
              this.response.state = 'danger';
            }
          },
          (error) => {
            this.response.active = true;
            this.response.state = 'danger';
            this.response.message = error;
            this.loading = false;
          }
        );
    }
  }

  cactiver(o, state, id, i) {
    if (!this.loading) {
      this.loading = true;
      const url = `${environment.apiUrl}editEtat/${id}/${state}`;
      this.nServ
        .getData(url)
        .pipe(first())
        .subscribe(
          (data) => {
            this.response.active = true;
            this.loading = false;
            this.response.message = data.message;
            if (!data.crash) {
              this.cusers[i].enabled = state;
              this.hcusers = this.cusers;
              this.response.state = 'success';
            } else {
              this.response.state = 'danger';
            }
          },
          (error) => {
            this.response.active = true;
            this.response.state = 'danger';
            this.response.message = error;
            this.loading = false;
          }
        );
    }
  }

  onKey() {
    const query = this.query;
    if (query != null && query !== '' && query !== undefined) {
      this.users = this.filterItems(query);
    } else {
      this.users = this.husers;
    }
  }

  filterItems(searchTerm) {
    return this.users.filter((item) => {
      return (
        item.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }
  nonKey() {
    const query = this.nquery;
    if (query != null && query !== '' && query !== undefined) {
      this.nusers = this.nfilterItems(query);
    } else {
      this.nusers = this.hnusers;
    }
  }

  nfilterItems(searchTerm) {
    return this.nusers.filter((item) => {
      return (
        item.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }

  cKey() {
    const query = this.cquery;
    if (query != null && query !== '' && query !== undefined) {
      this.cusers = this.cfilterItems(query);
    } else {
      this.cusers = this.hcusers;
    }
  }

  cfilterItems(searchTerm) {
    return this.cusers.filter((item) => {
      return (
        item.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }
 declasser(u: any, i) {
   if (this.loading) {return; }
   this.loading = true;
   const DATA = {
         current_promo: null
       };
   const url = `${environment.apiUrl}userEntities/${u.id}`;
   this.nServ
         .editData(url, DATA)
         .pipe(first())
         .subscribe(
           (data) => {
             this.users[i].current_promo = '';
             this.response.active = true;
             this.loading = false;
             this.response.state = 'success';
             this.response.message = 'Modification affectuée avec succès';
           },
           (error) => {
             this.response.active = true;
             this.response.state = 'danger';
             this.response.message = error;
             this.loading = false;
           }
         );

    }



}
