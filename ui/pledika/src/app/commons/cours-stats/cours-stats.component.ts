import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cours-stats',
  templateUrl: './cours-stats.component.html',
  styleUrls: ['./cours-stats.component.css']
})
export class CoursStatsComponent implements OnInit {
  ID: any;
  iloading: boolean;
  stats: any= [];
  frag: any;
  frags = [];
  nmc = "Meilleur cours";
  ncc = "Cours faible";
  tit = true;
  apromo: any;
  cindex = 0;

  constructor(
    public app: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {
       this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
  }
  IDP: any
  noFrag = true;
  ngOnInit(): void {
    this.ID =  this.route.snapshot.params.id;
    this.IDP = this.route.snapshot.params.idp;

    if (this.ID != 0 && this.ID != '0') {
      this.noFrag= false;
      this.getStat(this.ID);
      this.getPFByID(this.ID);

    }

    this.getPFragV2(this.IDP);
    this.getEtabInfo();
    this.getPromo();
  }

  // getPromoFragById

   getStat(id) {
    this.iloading = true;
    this.app.getData(`${environment.apiUrl}getStatForCours/${id}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.stats = data.data;
          this.setRapp();
        },
        (error) => {
          this.iloading = false;
        }
      );
   }

  getProfId(o) {
    return o.split("-")[2];
  }

   getPFByID(id) {
    this.iloading = true;
    this.app.getData(`${environment.apiUrl}getPromoFragById/${id}`)
      .pipe(first())
      .subscribe(
        (data) => {
           this.frag = data.data;
        },
        (error) => {
          this.iloading = false;
        }
      );
  }

   getPFragV2(id:any) {
     this.iloading = true;
    this.app.getData(`${environment.apiUrl}getPFragV2/${id}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.frags = data.data;
          if (this.noFrag && this.frags.length>0) {
             this.getStat(this.frags[0].id);
             this.getPFByID(this.frags[0].id);
          }
        },
        (error) => {
          this.iloading = false;
        }
      );
   }
   etab: any;
    getEtabInfo() {
    this.app
      .getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.etab = data._embedded.etablissements[0];
        },
        (error) => {}
      );
    }
  rapg;
  setRapp() {
    //
    let ress = 0; let echec = 0;

    for (let i = 0; i < this.stats.length; i++) {
       ress  +=  this.stats[i].reussit;
       echec += this.stats[i].echec;
    }

    ress = ress / this.stats.length;
    echec = echec / this.stats.length;
    this.rapg = { ress, echec, totalC: this.stats.length , totalE: 0, maxr: null, maxe: null };
    console.log(this.rapg);
    let te = this.stats[0].total;
    let maxr = this.stats[0];
    let maxe = this.stats[0];
    for (let i = 1; i < this.stats.length; i++) {
      if (te<this.stats[i].total) {
          te = this.stats[i].total;
      }
      if (maxr.reussit<this.stats[i].reussit) {
          maxr = this.stats[i];
      }
      if (maxe.echec<this.stats[i].echec) {
          maxe = this.stats[i];
      }
    }

    this.rapg.totalE = te;
    this.rapg.maxr = maxr;
    this.rapg.maxe = maxe;
  }
   index = 0;
  tpromo;
  cpromo : any;
   getPromo() {
    const url = `${environment.apiUrl}getPromoByAF`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          if (!data.crash) {
            this.apromo = data.data;
            this.tpromo = this.apromo.length;
            this.setCpromo();
          }
        },
        (error) => {
        }
      );
  }
  setCpromo() {
    for (let i = 0; i <  this.apromo; i++) {
      if (this.ID == this.apromo[i].id) {
          this.cpromo = this.apromo[i];
          break;
      }
    }
  }

getCPromo() {
  this.ID =  this.cpromo.id;
  this.router.navigate(['app/statCours/0/'+this.cpromo.id]);
}



}
