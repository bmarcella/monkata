import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-fiche-pers',
  templateUrl: './fiche-pers.component.html',
  styleUrls: ['./fiche-pers.component.css']
})
export class FichePersComponent implements OnInit {

  etab: any;
  ID: any;
  USER: any;
  constructor(private route: ActivatedRoute, private app: AppService, public studServ: StudentsService) { }

  ngOnInit() {
    this.getEtabInfo();
    this.ID = this.route.snapshot.params.id;
    this.getUserById(this.ID);
  }

  getUserById(id) {
    this.studServ.getUserById(id)
      .pipe(first())
      .subscribe(data => {
        this.USER = data;
        console.log(data);
      }, error => {
        return [];
      });

  }

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
