import { Component, OnInit } from '@angular/core';
import { VacationService } from 'src/app/_Services/vacation.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-vac',
  templateUrl: './vac.component.html',
  styleUrls: ['./vac.component.css']
})
export class VacComponent implements OnInit {

  vacs: any;
  mvac: any;
  loading: any;

  constructor(private vacServ: VacationService) {
   }

  ngOnInit() {
   this.getVacs();
  }

  getVacs() {
    this.vacServ.getVac()
      .pipe(first())
      .subscribe(data => {
        this.vacs = data._embedded.vacations;
      }, error => {
        return [];
      });

  }
}

