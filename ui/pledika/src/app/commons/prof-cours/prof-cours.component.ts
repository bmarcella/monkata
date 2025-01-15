import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-prof-cours',
  templateUrl: './prof-cours.component.html',
  styleUrls: ['./prof-cours.component.css']
})
export class ProfCoursComponent implements OnInit {

  cours: any;
  user: any;
  ID: any;
  constructor(private route: ActivatedRoute, public nServ: AppService, private auth: AuthenticationService) {
    // this.user = this.auth.currentUserValue;
    // this.cours = this.user.courses;
    // console.log(this.user);
  }

  ngOnInit() {
     this.ID = this.route.snapshot.params.id;
     this.getCours();
  }
  getCours() {
    const url = `${environment.apiUrl}getCoursForProf/${this.ID}`;
    this.nServ.getData(url).pipe(first())
      .subscribe(
        data => {
          if (!data.crash) {
            this.cours = data.data;
          }
          console.log(data);
        },
        error => {
        }
      );
  }

}
