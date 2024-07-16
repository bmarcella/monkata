import { formatNumber } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Type_Categorie } from 'src/app/admin/categorie/categorie.component';
import { AlertService } from 'src/app/service/alert.service';
import { CategorieService } from 'src/app/service/categorie.service';
import { CrudService } from 'src/app/service/crud.service';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { Env_Work, Horaire_de_travail, Periode_salaire, Type_contrat } from 'src/app/shared/models/Jobs';
import { getURL } from 'src/environments/environment.prod';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit {

  jobs: any =[];
  ei = 0;
  job: any;
  cjob: any;
  ent : any;
  ents: any = [];
  cEnt: any ;
  ccEnt: any ;
  path: any = 0;
  paginations;
  jpaginations;
  progress: any;
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

  w: any = {
    name: '',
    country: '',
    etat: '',
    ville: '',
    rue: ''
  };

  adresse = {
    country : "",
    name : "",
    etat:"",
    ville: "",
    rue: ""
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '400px',  // Set your desired default height here
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Ajouter le texte ici...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    // other config options...
  };
  contratOptions = Object.values(Type_contrat);
  envOptions = Object.values(Env_Work);
  horaireOptions = Object.values(Horaire_de_travail);
  salaireOptions = Object.values(Periode_salaire);
  avatar : any;

  constructor( private auth: KeycloakService, public router: Router, private crud: CrudService, private cat: CategorieService, private aUI:  AlertService) {

  }
  ngOnInit(): void {
    this.getEntCats();
    this.getCats();
    this.getEnts(1);
  }

  currency (num : any ) {
    return  formatNumber(Number(num), 'en-US', '1.0-0')
  }

  public getEnts(page: number) {
    const URL = getURL("memploi","cv/entreprises");
    this.crud.get(URL).then((r: any) => {
     if (r.length!=0) {
      this.ei = 0;
      this.ents = r;
      this.cEnt = this.ents[this.ei];
      this.avatar = this.auth.getLogo(this.cEnt.id);
      this.path=0;
     }
      console.log("DATA: ",r);
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }

 async switcher(name: any) {
    if (this.path == name) return;
    this.path = name;
    if(name==2)
    this.getJobs(1)
  }

  public getJobs(page: number) {
    const URL = getURL("memploi","getJobByIdEnt/"+this.cEnt.id+"/"+page);
    this.crud.get(URL).then((r: any) => {
     if (r.jobs.length!=0) {
      this.jobs= r.jobs;
      this.job= r.jobs[0];
      this.jpaginations = r.pagination;
     }
      console.log("JOBS: ",r);
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }


  show(event: MatSelectChange) {
    const data =event.value
    this.cEnt = data.data;
    this.avatar = this.auth.getLogo(this.cEnt.id);
    this.jobs = [];
    this.job  = undefined;
    this.path = 0;
    this.ei = data.index;
  }

  showJob(data: any) {
    this.job = data;
  }

  delete(e, cEnt) {
    if(!confirm("Voulez vous vraiment supprimer cette entreprise?")) return;
    const URL = getURL("memploi","cv/deleteEntreprise/"+this.cEnt.id);
    this.crud.delete(URL, e).then((r: any) => {
    this.ents.splice(this.ents.findIndex( function(i) {
      return i.id === cEnt.id;
    }.bind(this) ), 1);
    console.log("DATA: ",r);
    this.aUI.show({ active : true, message: 'Supression effectuée avec succès!' , type: "success", pos: 'top-right' });
    }).catch((e) => {
      const msg = e.error.error.message;
      this.aUI.show({ active : true, message: msg , type: "danger", pos: 'top-right' });
      console.log(e, msg);
    });
  }

  add:any = [];

  editAdresse(w, i, e) {
    const URL = getURL("memploi","cv/editAdresse/"+w.id);
    this.crud.post(URL,w, e).then((r: any) => {
    this.ents[this.ei].adresses[i]=r;
    this.add[i] = false;
    console.log("DATA: ",r);
    this.aUI.show({ active : true, message: 'Modification effectuée avec succès!' , type: "success", pos: 'top-right' });
    }).catch((e) => {
      const msg = e.error.error.message;
      this.aUI.show({ active : true, message: msg , type: "danger", pos: 'top-right' });
      console.log(e, msg);
    });
  }

  addAdresse(w, e) {
    const URL = getURL("memploi","cv/addAdresse/"+this.cEnt.id);
    this.crud.post(URL,w, e).then((r: any) => {
    this.ents[this.ei].adresses.push(r);
    console.log("DATA: ",r);
    this.aUI.show({ active : true, message: 'Insertion effectuée avec succès!' , type: "success", pos: 'top-right' });
    }).catch((e) => {
      const msg = e.error.error.message;
      this.aUI.show({ active : true, message: msg , type: "danger", pos: 'top-right' });
      console.log(e, msg);
    });
  }

  changeJobPage(page, e) {
    const URL = getURL("memploi","getJobByIdEnt/"+this.cEnt.id+"/"+page);
    this.crud.get(URL, e).then((r: any) => {
     if (r.jobs.length!=0) {
      this.jobs= r.jobs;
      this.job= r.jobs[0];
      this.jpaginations = r.pagination;
     }
    console.log("JOBS: ",r);
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }

  changePage(page, e) {
    const URL = getURL("memploi","cv/entreprises/"+page);
    this.crud.get(URL, e).then((r: any) => {
     if (r.ents.length!=0) {
      this.ei = 0;
      this.ents = r.ents;
      this.cEnt = this.ents[this.ei];
      this.paginations = r.pagination;
      this.path=0;
     }
      console.log("DATA: ",r);
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }

  public scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  public getCats() {
    this.cat.getCatforEnt(Type_Categorie[0]).then((r) => {
    this.cats= r;
    }).catch((e) => console.log(e));
  }

  public getEntCats() {
    this.cat.getCatforEnt(Type_Categorie[1]).then((r) => {
    this.eCats = r;
    }).catch((e) => console.log(e));
  }

  step = 0;

  editEnt(e) {
    const URL = getURL("memploi","cv/editEntreprise/"+this.cEnt.id);
    this.crud.post(URL,this.cEnt, e).then((r: any) => {
    this.ents[this.ei] = r;
    console.log("DATA: ",r);
    this.aUI.show({ active : true, message: 'Modification effectuée avec succès!' , type: "success", pos: 'top-right' });
    }).catch((e) => {
      const msg = e.error.error.message;
      this.aUI.show({ active : true, message: msg , type: "danger", pos: 'top-right' });
      console.log(e, msg);
    });
  }

  message: any;
  fileInfos: any;
  selectedFile: any;
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e:any) => {
     this.avatar = e.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
    this.upload(event);
    console.log(this.selectedFile);
  }

  upload(e): void {
    this.progress = 0;
    const data = new FormData();
    data.append('file', this.selectedFile);
    const URL = getURL("memploi","cv/changeLogo/"+this.cEnt.id);
        this.crud.upload(URL,data, e).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              console.log(event);
              this.progress = undefined;
              this.message = event.body.message;
              this.aUI.show({ active : true, message: 'Logo modifié avec succès!' , type: "success", pos: 'top-right' });
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.aUI.show({ active : true, message: this.message  , type: "danger", pos: 'top-right' });
            this.selectedFile = undefined;
          });
  }




}
