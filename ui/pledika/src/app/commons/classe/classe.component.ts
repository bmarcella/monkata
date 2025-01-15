import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  page: any;
  constructor(private route: ActivatedRoute, private app: AppService) { }

  NIV: any = [];
  CNIV;

  PROMO: any = [];
  HPROMO: any = [];

  ngOnInit() {
    this.page = this.route.snapshot.params.page;
    this.getClasse();
  }

  getClasse() {
    const url = `${environment.apiUrl}niveau_rels?size=1000`;
    // let url = `${environment.apiUrl}promotions/search`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.NIV = data._embedded.niveau_rels;
        },
        error => {
        }
      );
  }

  cdel; pos;
  rdel(o,i) {
     this.cdel = o;
     this.pos=i;
  }
  xdel() {
    this.cdel = false;
    this.pos = -1;
  }

  load=false;
  del() {
    if (this.load){return;}
    this.load=true;
    const url = `${environment.apiUrl}niveau_rels/${this.cdel.id}`;
    this.app
      .delData(url)
      .pipe(first())
      .subscribe(
        () => {
          this.NIV.splice(this.pos, 1);
          this.xdel();
          this.load=false;
        },
        () => { this.load = false; }
      );
  }

setNiv(a) {
  this.CNIV = a;
  this.getPromo();
}

  getPromo() {
  const  url = this.CNIV._links.promotion.href +`?sort=id,desc&size=100`;
  this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.tri(data._embedded.promotions);
        },
        error => {
        }
      );
  }

  tri(p) {
    p.forEach(e => {
      if (e.enabled) {
        this.PROMO.push(e);
      } else {
        this.HPROMO.push(e);
      }
    });
  }
close(){
  this.CNIV = false;
  this.PROMO  = [];
  this.HPROMO = [];
}

}
