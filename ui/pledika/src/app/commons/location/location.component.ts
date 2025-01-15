import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"],
})
export class LocationComponent implements OnInit {
  [x: string]: any;
  // IMEI : 353328076746518
  loading: any;
  mat: any = { code: "", name: "", etat: "" };
  cmat: any = { id: "", code: "", name: "", etat: "" };
  response = { state: "", message: "", active: false };
  submitted = false;
  pos: any;
  etats = [];
  villes = [];
  constructor(public nServ: AppService) { }

  ngOnInit() {
    this.getDepart();
    this.getVille();
  }
  getDepart() {
    const url = `${environment.apiUrl}etats`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.etats = data._embedded.etats;
        },
        (error) => { }
      );
  }
  getVille() {
    const url = `${environment.apiUrl}villes`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.villes = data._embedded.villes;
        },
        (error) => { }
      );
  }

  del(a, i) {
    const url = `${environment.apiUrl}villes/${a.id}`;
    this.nServ
      .delData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.villes.splice(i, 1);
          this.loading = false;
          this.response3.active = true;
          this.response3.state = "success";
          this.response3.message = "Ville a été effacé avec succès";
        },
        (error) => {
          this.loading = false;
          this.response3.active = true;
          this.response3.state = "danger";
          this.response3.message = error;
        }
      );
  }
  edit(a, i) {
    this.cmat = a;
    this.pos = i;
  }
  addMat() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    const $POST = {
      name: this.mat.name,
      code: this.mat.code,
      etat: `${environment.apiUrl}etats/${this.mat.etat}`,
    };
    const url = `${environment.apiUrl}villes`;
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
            this.mat = { code: "", name: "", etat: "" };
            this.villes.push(data);
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
  }
  editMat(id) {
    if (this.loading) {
      return;
    }
    this.response.active = false;
    this.loading = true;
    const $POST = {
      name: this.cmat.name,
      code: this.cmat.code,
    };
    const url = `${environment.apiUrl}villes/${id}`;
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
            this.cmat = { id: "", code: "", name: "", etat: "" };
            this.mat[this.pos] = data;
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
  }
  close() {
    this.cmat = { id: "", code: "", name: "", etat: "" };
    this.pos = -1;
  }
}
