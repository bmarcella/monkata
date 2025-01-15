import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-rpaiement',
  templateUrl: './rpaiement.component.html',
  styleUrls: ['./rpaiement.component.css']
})
export class RpaiementComponent implements OnInit {
  rapp: any;

  constructor(private route: ActivatedRoute, private app: AppService) { }

  ngOnInit() {
   this.getStat();
  }

  getStat() {
    this.app
      .getData(`${environment.apiUrl}getrPaiement`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.rapp = data.data;
        },
        () => { }
      );
  }

 getPC(){
   let p = ((this.rapp.gain / this.rapp.max_gain) * 100).toFixed(0);
   console.log(p);
   return  p;
 }

}
