import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-finissant',
  templateUrl: './finissant.component.html',
  styleUrls: ['./finissant.component.css']
})
export class FinissantComponent implements OnInit {

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
    const url = `${environment.apiUrl}getFinissant`;
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
 if (confirm('Voulez-vous vraiment supprimer cet(te) etudiant(e) ?')) {
    const url = `${environment.apiUrl}userEntities/${id}`;
    this.studServ.editData(url, {exclude: true})
      .pipe(first())
      .subscribe(
        data => {
          this.users.splice(i, 1);
        },
        error => { }
      );
   }
}
}
