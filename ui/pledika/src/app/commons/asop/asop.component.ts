import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-asop',
  templateUrl: './asop.component.html',
  styleUrls: ['./asop.component.css']
})
export class AsopComponent implements OnInit {
  ID: any;
  users: any;
  promo: any;

  constructor( private route: ActivatedRoute, private app: AppService) { }

  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.getEtabInfo();
    this.getParcours();
    this.getPromo();
  }

  getPromo() {
    this.app.getData(`${environment.apiUrl}promotions/${this.ID}`)
      .pipe(first())
      .subscribe(
        data => {
          this.promo = data;
        },
        error => {
        }
      );
  }

  getParcours() {
    this.app.getData(`${environment.apiUrl}getParcours/${this.ID}`)
      .pipe(first())
      .subscribe(
        data => {
          this.users = data.data;
        },
        error => {
        }
      );
  }

  etab: any;

  getEtabInfo() {
    this.app.getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        data => {
          this.etab = data._embedded.etablissements[0];
        },
        error => {
        }
      );
  }


}
