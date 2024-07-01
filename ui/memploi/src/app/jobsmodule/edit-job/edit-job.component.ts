import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
// import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Type_Categorie } from 'src/app/admin/categorie/categorie.component';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AlertService } from 'src/app/service/alert.service';
import { CategorieService } from 'src/app/service/categorie.service';
import { CrudService } from 'src/app/service/crud.service';
import { Currency } from 'src/app/shared/models/Currency';
import { App_Reception, Env_Work, Horaire_de_travail, Jobs, Periode_salaire, Type_contrat } from 'src/app/shared/models/Jobs';
import { getURL } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css'],
})
export class EditJobComponent implements OnInit {
  public routes = routes;

  job: Jobs = new Jobs();
  id: any | undefined;
  contratOptions = Object.values(Type_contrat);
  envOptions = Object.values(Env_Work);
  horaireOptions = Object.values(Horaire_de_travail);
  salaireOptions = Object.values(Periode_salaire);
  devOptions = Object.values(Currency);
  repOptions = Object.values(App_Reception);
  rec = App_Reception;
  cats: any = [];
  selectedEnt: any;
  selectedAd: any;
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
    placeholder: 'Ajouter du poste ici...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    // other config options...
  };
  constructor( public act: ActivatedRoute, public router: Router, private crud: CrudService, private aUI:  AlertService, private cat: CategorieService) {
  }
  ngOnInit(): void {
    this.act.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getJob(this.id);
      this.getCats();
    });

  }



  public getCats() {
    this.cat.getCatforEnt(Type_Categorie[0]).then((r) => {
    this.cats = r;
    }).catch((e) => console.log(e));
  }

  changeRec(option: any){
    this.job.app_reception = option;
    if (option == this.rec.email) this.job.email_to_apply = this.selectedEnt.email_contact;
    if (option == this.rec.whatsapp) this.job.phone_to_apply = this.selectedEnt.telephone_a;
  }

  changeEnt(){
    this.job.email_to_apply ="";
    this.job.phone_to_apply ="";
  }

  public addJob(e: any) {
    const URL = getURL("memploi","edit/"+this.job.id);
    console.log(this.job);
    this.crud.post(URL, this.job , e).then((r) => {
     console.log(r);
     this.aUI.show({ active : true, message: 'Success' , type: "success", pos: 'top-right' });
    }).catch((e) => {
      const msg = e.error.error.message;
      this.aUI.show({ active : true, message:msg , type: "danger", pos: 'top-right' });
      console.log(msg);
    });
  }

  public async getJob(id: any) {
    const RURL = getURL("memploi","cv/refresh");
    const DATA = await this.crud.get(RURL);
    const URL = getURL("memploi","getMyJob/"+id);
    this.crud.get(URL).then((r) => {

     const job = r;
     if(job.date_echeance)
     job.date_echeance = r.date_echeance.split("T")[0];
     this.job = job;
     console.log(this.job);
    }).catch((e) => {
      const msg = e.error.error.message;
      this.aUI.show({ active : true, message:msg , type: "danger", pos: 'top-right' });
      console.log(msg);
    });
  }






}
