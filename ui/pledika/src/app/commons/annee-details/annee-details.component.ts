import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: "app-annee-details",
  templateUrl: "./annee-details.component.html",
  styleUrls: ["./annee-details.component.css"],
})
export class AnneeDetailsComponent implements OnInit {
  user: any;
  ID: any;
  afs: any;
  response = { state: "", message: "", active: false };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public nServ: AppService,
    private auth: AuthenticationService
  ) {
    this.user = this.auth.currentUserValue;
  }
  loading;
  a: any = { date_debut: "", date_fin: "" };
  submitted = false;
  success = "";
  cindex = null;
  af: any;
  del;
  add;
  pos;
  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.getAcad();
  }

  getAcads() {
    const url = `${environment.apiUrl}promo_afs?size=100`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          this.setAf(data._embedded.promo_afs);
        },
        (error) => {}
      );
  }

  setAf(array) {
    const na = [];
    array.forEach((e) => {
      if (e.id != this.ID) {
        na.push(e);
      }
    });
    this.afs = na;
  }

  setDate(date: any) {
    const nd = new DatePipe("en-US").transform(date, "yyyy-MM-dd");
    return nd;
  }

  getAcad() {
    const url = `${environment.apiUrl}promo_afs/${this.ID}`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          console.log(data);
          this.af = data;
          this.af.date_debut = this.setDate(this.af.date_debut);
          this.af.date_fin = this.setDate(this.af.date_fin);
          this.getAcads();
        },
        (error) => {}
      );
  }

  editAcad(af) {
    const url = `${environment.apiUrl}promo_afs/${this.ID}`;
    this.nServ
      .editData(url, af)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          console.log(data);
          this.af = data;
          this.af.date_debut = this.setDate(this.af.date_debut);
          this.af.date_fin = this.setDate(this.af.date_fin);
          this.response.active = true;
          this.response.state = "success";
          this.response.message = "Modification effectuée avec succès.";
        },
        (error) => {
          this.response.active = true;
          this.response.state = "danger";
          this.response.message = error;
       }
      );
  }
}
