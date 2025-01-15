import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent implements OnInit {

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
         this.setLogo(data.id_img);
      }, error => {
        return [];
      });

  }

  getEtabInfo(){
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

logo;
setLogo(id){
     this.logo = (id!=null) ? `${environment.apiUrl}getFiles/${id}` : undefined;
}

getLocalImg(img: any) {
    return `assets/${img}`;
}

}
