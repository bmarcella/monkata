import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-parcours',
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.css']
})
export class ParcoursComponent implements OnInit {
  ID: any;
  STUDS: any;
  HSTUDS: any;
  nivs: any;
  cniv: any;

  constructor(private route: ActivatedRoute, private app: AppService) { }

  ngOnInit() {
    this.getNiv();
  }

  getParcours(state, query) {
    this.app.getData(`${environment.apiUrl}getAllParcoursNew/${state}/${query}`)
      .pipe(first())
      .subscribe(
        data => {
          this.STUDS = data.data;
          this.HSTUDS = this.STUDS;
        },
        error => {
        }
      );
  }

  getNiv() {
    this.app.getData(`${environment.apiUrl}niveaus`)
      .pipe(first())
      .subscribe(
        data => {
          this.nivs = data._embedded.niveaus;
          this.cniv = this.nivs[0].code;
          this.getParcours(true, this.cniv);
        },
        error => {
        }
      );
  }

  change(e) {
    const query = e.target.value;
    this.getParcours(true,query);
  }

  onKeyUp(e) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
      this.STUDS = this.filterItems(query);
    } else {
      this.STUDS = this.HSTUDS;
    }
  }

  filterItems(searchTerm) {
    return this.STUDS.filter(item => {
      return item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_student.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }



}
