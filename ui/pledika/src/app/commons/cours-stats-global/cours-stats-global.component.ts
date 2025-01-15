import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import * as XLSX from 'xlsx';
import * as GC from '@grapecity/spread-sheets';
import * as Excel from '@grapecity/spread-excelio';

@Component({
  selector: 'app-cours-stats-global',
  templateUrl: './cours-stats-global.component.html',
  styleUrls: ['./cours-stats-global.component.css']
})
export class CoursStatsGlobalComponent implements OnInit {

  ID: any;
  iloading: boolean;
  stats = [];
  frag: any;
  frags = [];
  constructor(
    public app: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {
   this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
  }
  fileName: any;
  exportexcel(): void {
    /* table id is passed over here */
    this.fileName =  this.frag.code+'.xlsx';
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    for (var i = 0; i < this.stats.length; i++) {
       const element = document.getElementById('sheet_'+this.stats[i].id_frag);
       const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
       XLSX.utils.book_append_sheet(wb, ws,this.stats[i].control.split("-")[3]);
    }
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  getProfId(o) {
    return o.split("-")[2];
  }


  ngOnInit(): void {
    this.ID = this.route.snapshot.params.id;
    this.getStat();
  }

  getPromo() {
    const url = `${environment.apiUrl}getPromoByAF`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          if (!data.crash) {
            this.frags = data.data;
          }
        },
        (error) => {
          this.getPromo();
        }
      );
  }
  // getPromoFragById

   getStat() {
    this.iloading = true;
    this.app.getData(`${environment.apiUrl}getStatForCoursByPromo/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.frag = data.data.promo;
          this.stats = data.data.lsg;
          console.log(data);
this.getPromo();
         //  this.stats = data.data;
        },
        (error) => {
          this.iloading = false;
          this.getPromo();
        }
      );
   }





}
