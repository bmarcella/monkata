import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';

@Component({
  selector: "app-del-promo",
  templateUrl: "./del-promo.component.html",
  styleUrls: ["./del-promo.component.css"],
})
export class DelPromoComponent implements OnInit {
  user: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    public studServ: StudentsService,
    private authenticationService: AuthenticationService,
    private app: AppService,
    private router: Router
  ) {
    this.user = this.authenticationService.currentUserValue;
    if (this.user.role.name != "ADMIN" && this.user.role.name != "MASTER") {
      this.router.navigate(["/app/home"]);
    }
  }
  ID: any;
  promo: any;
  loading;
  response = { state: "", message: "", active: false };
  over = false;

  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.getPromo(this.ID);
  }
  getPromo(ID) {
    this.app
      .getData(`${environment.apiUrl}getPromo/${ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          if (
            data.data != null &&
            data.data !== "" &&
            data.data !== undefined
          ) {
            this.promo = data.data;
          } else {
            this.over = true;
          }
        },
        (error) => {
          this.over = true;
        }
      );
  }

  delPromo() {
    this.loading = true;
    this.app
      .delData(`${environment.apiUrl}promotions/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.over = true;
          this.loading = false;
          this.response.active = true;
          this.response.state = "success";
          this.response.message =
            "Cette promotion a été supprimée avec succès.";
        },
        (error) => {
          this.loading = false;
          this.response.active = true;
          this.response.state = "danger";
          this.response.message = error;
        }
      );
  }
}
