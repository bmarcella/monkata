import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {
  PROMO: any = [];
  HPROMO: any = [];

  constructor(private route: ActivatedRoute, private app: AppService) { }

  ngOnInit() {
    this.getPromo();
  }

  getPromo() {
    const url = `${environment.apiUrl}promotions?sort=id,desc&size=100`;
   // let url = `${environment.apiUrl}promotions/search`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.tri(data._embedded.promotions) ;
          console.log(data);
        },
        error => {
          console.log(error);
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

}
