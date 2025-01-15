import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { AppService } from 'src/app/_Services/app.service';

@Component({
  selector: "app-prof",
  templateUrl: "./prof.component.html",
  styleUrls: ["./prof.component.css"],
})
export class ProfComponent implements OnInit {
  query: string;
  nusers = [];
  husers: any;
  hnusers: any[];
  loading: any;
  constructor(public studServ: StudentsService, public nServ: AppService) {}
  page = 0;
  // tslint:disable-next-line: no-inferrable-types
  size: number = 50;
  users = [];
  p: any;
  tp = [];
  rtp;
  ngOnInit() {
    // const url = `${environment.apiUrl}profs?size=${this.size}&page=${this.page}`;
    // this.getAll(url);
    this.getProf();
  }

  getProf() {
    const url = `${environment.apiUrl}getUserV2/PROF`;
    this.studServ
      .getAll(url)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.setupUser(data.data);
        },
        (error) => {}
      );
  }

  setupUser(array) {
    array.forEach((e) => {
      if (e.enabled) {
        this.users.push(e);
      } else {
        this.nusers.push(e);
      }
    });
    this.husers = this.users;
    this.hnusers = this.nusers;
  }

  getDate(d) {
    if (d != null) {
      return d.split("T")[0];
    }
    return "non mentioné";
  }

  response = { state: "", message: "", active: false };

  activer(o,state, id, i) {
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
              this.husers=this.users;
              this.nusers.splice(i,1);
              this.hnusers = this.nusers;
              this.response.state = "success";
            } else {
              this.response.state = "danger";
            }
          },
          (error) => {
            this.response.active = true;
            this.response.state = "danger";
            this.response.message = error;
            this.loading = false;
          }
        );
    }
  }

  onKey(e) {
    const query = e.target.value;
    if (query != null && query !== "" && query !== undefined) {
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
  nonKey(e) {
    const query = e.target.value;
    if (query != null && query !== "" && query !== undefined) {
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
}
