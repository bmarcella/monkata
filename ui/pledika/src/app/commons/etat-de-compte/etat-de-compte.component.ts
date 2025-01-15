import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-etat-de-compte',
  templateUrl: './etat-de-compte.component.html',
  styleUrls: ['./etat-de-compte.component.css']
})
export class EtatDeCompteComponent implements OnInit {
  STUDS =  [];
  HSTUDS = [];
  rapp: any;
  search: boolean;
  
  constructor(
    public studServ: StudentsService,
    private route: ActivatedRoute,
    private app: AppService
  ) { }

  ngOnInit() {
    this.getParcours()
  }

  getParcours() {
    this.app
      .getData(`${environment.apiUrl}getParcoursForEC`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.STUDS = data.data.p;
          data.data.p=[];
          this.rapp = data.data;
          this.HSTUDS = this.STUDS;
          console.log(data);
        },
        (error) => { }
      );
  }

  onKeyUp(e) {
    const query = e.target.value;
    if (query != null && query !== "" && query !== undefined) {
      this.search = true;
      this.STUDS = this.filterItems(query);
    } else {
      this.search = false;
      this.STUDS = this.HSTUDS;
    }
  }

  filterItems(searchTerm) {
    return this.STUDS.filter((item) => {
      return (
        item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_student.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }

}
