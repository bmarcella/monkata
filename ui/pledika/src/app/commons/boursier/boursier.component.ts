import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-boursier',
  templateUrl: './boursier.component.html',
  styleUrls: ['./boursier.component.css']
})
export class BoursierComponent implements OnInit {

  constructor(public studServ: AppService) { }

  husers: any;
  page = 0;
  // tslint:disable-next-line: no-inferrable-types
  size: number = 10;
  users: any;
  p: any;
  tp = [];
  rtp;

  loading = false;
  response16 = { state: '', message: '', active: false };
  ngOnInit() {

    this.getAll();
  }

  onKey(e) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
      this.users = this.filterItems(query);
    } else {
      this.users = this.husers;
    }
  }

  filterItems(searchTerm) {
    return this.users.filter(item => {
      return item.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
             item.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
             item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  getAll() {
    const url = `${environment.apiUrl}getBoursier`;
    this.studServ
      .getData(url)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.users =  data.data;
          this.husers = data.data;
        },
        error => { }
      );
  }

del(id, i) {
 if (confirm('Voulez-vous vraiment supprimer la bourse de cet(te) etudiant(e) ?')) {
    const url = `${environment.apiUrl}userEntities/${id}`;
    this.studServ.editData(url, {granted: 0})
      .pipe(first())
      .subscribe(
        data => {
          this.users.splice(i, 1);
        },
        error => { }
      );
   }
  }

  editBourse(o) {
    if (!this.loading) {
        this.loading = true;
        const url = `${environment.apiUrl}editBourse/${o.id}/${o.bourse}`;
        this.studServ.getData(url).pipe(first())
          .subscribe(
            data => {
              this.response16.active = true;
              this.loading = false;
              this.response16.state = 'success';
              this.response16.message = 'Modification affectuée avec succès';
            },
            error => {
              this.response16.active = true;
              this.response16.state = 'danger';
              this.response16.message = error;
              this.loading = false;
            }
          );

      }
  }

}
