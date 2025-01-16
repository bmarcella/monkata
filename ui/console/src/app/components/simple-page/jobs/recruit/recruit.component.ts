import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { Etat_demande } from 'src/app/shared/models/Postulants';
import { getURL } from 'src/environments/environment.prod';
import { AlertService } from '../../../../service/alert.service';
import { CategorieService } from '../../../../service/categorie.service';
import { CrudService } from '../../../../service/crud.service';
export const Type_Categorie = ['Poste', 'Entreprise'];

@Component({
  selector: 'app-job-recruit',
  templateUrl: './component.html',
  styleUrl: './component.scss'
})
export class RecruitComponent implements OnInit  {

  
  jobs: any =[];
  ei = 0;
  ji = 0;
  state: any;
  cv: any;
  job: any = undefined;
  ents: any = [];
  cEnt: any ;
  ccEnt: any ;
  path: any = 0;
  post: any;
  cands: any = [];
  ccand: any ;

  paginations;
  cats: any = [];
  eCats: any = [];
  filter : any = {
    query: '',
    categorie: '',
    location: '',
    type_contrat: '',
    env: '',
    horaire: '',
  }

  adresse = {
    country : "",
    name : "",
    etat:"",
    ville: "",
    rue: ""
  }
  etatDemandeOptions = Object.values(Etat_demande);

  constructor(  private auth: KeycloakService, public router: Router, private crud: CrudService, private cat: CategorieService, private aUI:  AlertService) {
  }

  getDoc(id: number){
    return this.auth.getDoc(id);
  }

  ngOnInit(): void {
    this.getEnt();
  }

  currency (num : any ) {
    return  formatNumber(Number(num), 'en-US', '1.0-0')
  }

  public getEnt() {
    const URL = getURL("users","entreprise/get");
    this.crud.get(URL).then((r: any) => {
      this.ei = 0;
      this.cEnt=r;
      this.getJobs(this.cEnt.id);
      this.path=0;
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }

  public getEnts() {
    const URL = getURL("memploi","cv/entreprises");
    this.crud.get(URL).then((r: any) => {
     if (r.length!=0) {
      this.ei = 0;
      this.ents = r;
      this.cEnt=r[0];
      this.getJobs(this.cEnt.id);
      this.path=0;
     }
      console.log("DATA: ",r);
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }

  switcher(name: any){
    this.path = name;
  }

  public getJobs(id: number) {
    const URL = getURL("memploi","getJobByIdEntNoPage/"+id);
    this.crud.get(URL).then((r: any) => {
     if (r.length!=0) {
      this.jobs= r;
      this.job= r[0];
      this.state = false;
      this.getPostulants(this.job.id, 1);
     }
    console.log("JOBS: ",r);
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }


  selectEnt(event: any) {
    const data =event.value
    this.cEnt = data.data;
    this.jobs = [];
    this.job  = undefined;
    this.path = 0;
    this.ei = data.index;
    this.getJobs(this.cEnt.id);
  }

  selectJob(event: any) {
    const data = event.target.value;
    this.getPostulants(data.id, 1);
  }

  showJob(data: any) {
    this.job = data;
  }

  selectState(event: any) {
    const data = event.target.value;
    this.state = data;
    this.cands = [];
    this.ccand = undefined;
    this.post = undefined;
    this.getPostulants(this.job.id, 1);
  }

  public getPostulants(id: number, page: number, e = undefined) {
    const URL = getURL("memploi","getPostByIdJob/"+id+"/"+this.state+"/"+page);
    this.crud.get(URL,e).then((r: any) => {
     if (r.cands.length!=0) {
       this.cands = r.cands;
       this.paginations = r.pagination;
       this.post = this.cands[0];
       this.getCVForRecuiter( this.post.id_postulant);
     }
    console.log("POST: ",r);
    }).catch((e) => {

      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }

  changePage(p, e: any){
    this.getPostulants(this.job.id, p, e);
  }

  changeCands(c: any){
    this.post = c;
    this.ccand = undefined;
    this.getCVForRecuiter( this.post.id_postulant);
  }



  getCVForRecuiter(id:number){
    const URL = getURL("memploi","cv/getCVForRecuiter/"+id);
    this.crud.get(URL).then((r: any) => {
    this.ccand = r;
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }



  changeState(data: any){
    console.log(data);
    const URL = getURL("memploi","changeState");
    this.crud.post(URL, data).then((r: any) => {

      if (this.state!=data.state && this.state) {

        this.cands.splice(this.cands.findIndex(function(i) {
          return i.id === data.id;
        }), 1);
        this.cands = [];
        this.ccand = undefined;
        this.post = undefined;
        this.getPostulants(this.job.id, 1);

     }


    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }



  public scrollToTop(): void {
    window.scrollTo(0, 0);
  }


  step = 0;

}
