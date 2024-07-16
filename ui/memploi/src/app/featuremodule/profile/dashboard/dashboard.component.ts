/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from 'src/app/service/crud.service';
import { getURL } from 'src/environments/environment.prod';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  cands: any = [] ;
  constructor(public router: Router, private crud: CrudService){
  }
  ngOnInit(): void {
    this.getCands();
    this.getCompletion() 
  }

  public getCands() {
    const URL = getURL("memploi","cv/dashboard");
    this.crud.get(URL).then((r) => {
      this.cands = r;
      console.log(r);
    }).catch((e) =>{
    console.log(e);
    });
  }
  note : any = 0;
  public getCompletion() {
    const URL = getURL("memploi","cv/completion");
    this.crud.get(URL).then((r) => {
    this.note = r;
    console.log(r);
    }).catch((e) => console.log(e));
  }

  getNote(){
    if(this.note==0) return 0;
    return Math.round((this.note.note / this.note.total ) * 100 );
  }
  filler = {
    email : "Ajouter votre email de contact",
    etudes : "Ajouter au moins une étude",
    language : "Ajouter au moins une langue parler",
    name : "Ajouter votre nom et prénom",
    phone : "Ajouter au moin un numero de téléphone",
    profLen : "Votre profil droit avoir au moins 200 characteres",
    skills : "Ajouter au moins une compétence",
    titreAndProfile : "Vous devez ajouter votre titre et profil",
    works : "Ajouter au moins une experiences de travails",
  };
  miss(key: any) {
    return this.filler[key];
  }
}
