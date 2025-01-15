import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-personel',
  templateUrl: './personel.component.html',
  styleUrls: ['./personel.component.css']
})
export class PersonelComponent implements OnInit {
  husers: any;

  constructor(public studServ: StudentsService) { }
  page = 0;
  // tslint:disable-next-line: no-inferrable-types
  size: number = 10;
  users: any;
  p: any;
  tp = [];
  rtp;
  ngOnInit() {
    
    this.getAll();
  }

  getDate(d) {
    if (d != null) {
      return d.split("T")[0];
    }
    return 'non mentioné';
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
    const url = `${environment.apiUrl}getPersonnel`;
    this.studServ
      .getAll(url)
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
}
