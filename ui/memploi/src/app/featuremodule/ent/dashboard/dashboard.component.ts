/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { getURL } from 'src/environments/environment.prod';


@Component({
  selector: 'app-ent-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  cands: any = [] ;
  constructor(public router: Router, private crud: CrudService){
  }
  ngOnInit(): void {
    this.getCands();
    this.getEntreprises();
    this.getCount();
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

  ent : any;
  rep: any;
  public getEntreprises() {
    const URL = getURL("memploi","countEntAndJob");
    this.crud.get(URL).then((r) => {
    this.ent = r.count;
    console.log(r);
    }).catch((e) => console.log(e));
  }

  public getCount() {
    const URL = getURL("memploi","count");
    this.crud.get(URL).then((r) => {
     this.rep = r;
    }).catch((e) => console.log(e));
  }



  filler = {
    email : "Ajouter votre email de contact",
    etudes : "Ajouter votre au moins une etude",
    language : "Ajouter votre au moins une langue parler",
    name : "Ajouter votre nom et prenom",
    phone : "Ajouter votre au moin un numero de téléphone",
    profLen : "Votre profil droit avoir au moins 200 characteres",
    skills : "Ajouter au moins une competence",
    titreAndProfile : "Vous devez ajouter votre titre et profil",
    works : "Ajouter au moins une experiences de travails",
  };
  miss(key: any) {
    return this.filler[key];
  }
}
