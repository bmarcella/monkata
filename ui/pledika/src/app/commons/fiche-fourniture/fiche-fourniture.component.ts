import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: "app-fiche-fourniture",
  templateUrl: "./fiche-fourniture.component.html",
  styleUrls: ["./fiche-fourniture.component.css"],
})
export class FicheFournitureComponent implements OnInit {
  pay: any;
  ff: any;

  constructor(
    private route: ActivatedRoute,
    private app: AppService,
    public studServ: StudentsService
  ) {}

  etab: any;

  ngOnInit() {
    this.getEtabInfo();
    this.getFF();
  }

  getUserById() {}

  getFF() {
    this.app
      .getData(`${environment.apiUrl}getFicheFournitures`)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.ff = data.data;
        },
        (error) => {}
      );
  }
  getEtabInfo() {
    this.app
      .getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.etab = data._embedded.etablissements[0];
        },
        (error) => {}
      );
  }



  getData(items, t) {
   let data = [];
   for(let i = 0 ; i<items.length; i++){
     if(items[i].type_fn==t){
       data.push(items[i]);
    }
   }
   return data;
  }
  setDate(){

  }
}
