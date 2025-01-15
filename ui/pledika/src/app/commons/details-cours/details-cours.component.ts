import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-details-cours',
  templateUrl: './details-cours.component.html',
  styleUrls: ['./details-cours.component.css']
})
export class DetailsCoursComponent implements OnInit {


  // /////
  ID: BigInteger;
  cours: any;
  response = { state: '', message: '', active: false };
  prof: any;
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, public studServ: StudentsService, public app: AppService) { }
  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.getCourses();
  }
  getCourses() {
    const url = `${environment.apiUrl}courses/${this.ID}`;
    this.app.getData(url).pipe(first())
      .subscribe(
        data => {
          this.cours = data;
           this.getProf(data._links.prof.href);
        },
        error => {
        }
      );
  }



  getProf(url) {
    this.app.getData(url).pipe(first())
      .subscribe(
        data => {
          this.prof = data;
        },
        error => {
        }
      );
  }

}
