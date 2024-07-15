import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

// import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Type_Categorie } from 'src/app/admin/categorie/categorie.component';
import { routes } from 'src/app/core/helpers/routes/routes';
import {
  checkValidator,
  toggleButton,
  Val,
} from 'src/app/core/Validator';
import { AlertService } from 'src/app/service/alert.service';
import { CategorieService } from 'src/app/service/categorie.service';
import { CrudService } from 'src/app/service/crud.service';
import { Currency } from 'src/app/shared/models/Currency';
import {
  App_Reception,
  Env_Work,
  Horaire_de_travail,
  Jobs,
  Periode_salaire,
  Type_contrat,
} from 'src/app/shared/models/Jobs';
import { getURL } from 'src/environments/environment.prod';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css'],
})
export class AddJobComponent implements OnInit {
  public routes = routes;

  job: Jobs = new Jobs();
  contratOptions = Object.values(Type_contrat);
  envOptions = Object.values(Env_Work);
  horaireOptions = Object.values(Horaire_de_travail);
  salaireOptions = Object.values(Periode_salaire);
  devOptions = Object.values(Currency);
  repOptions = Object.values(App_Reception);
  rec = App_Reception;
  ents: any = [];
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
  refresh = 3;
  constructor( public router: Router, private crud: CrudService, private aUI:  AlertService, private cat: CategorieService) {
    this.job.app_reception = this.rec.memploi;
    this.job.is_certificat_require = false;
    this.job.is_cv_require = false;
    this.job.is_diplome_require = false;
    this.job.is_lm_require = false;
  }
  ngOnInit(): void {
    this.getEntreprises();
    this.getCats();
  }
  see = false;
  public async  getEntreprises() {
    await this.crud.refresh();
    this.see = true;
    const URL = getURL("users","entreprise/getAllWithAdress");
    this.crud.get(URL).then((r) => {
    this.ents = r;
    console.log(r);
    }).catch(async (e) =>{
        if(this.refresh>3) {
          this.refresh--;
          this.getEntreprises();
      }
       console.log(e);
  });
  }

  newEnt(){
     this.router.navigate(['/jobs/add-ent']);
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

  changeEnt(e){
    console.log(e);
    this.job.email_to_apply ="";
    this.job.phone_to_apply ="";
    this.selectedAd = undefined;
  }


  val : Val[]  = [
    {
     name : "titre_job",
     mlength : 50,
     message: "Titre du poste ne doit pas etre vide.",
     mlmessage : "Titre du poste ne doit pas depasser 50 characteres."
    },
    {
      name : "categorie",
      mlength : 100,
      message: "Vous devez selectionner un categorie",
      mlmessage : "Le Titre du poste ne doit pas depasser 100 characteres."
    },
    {
      name : "description",
      mlength : 10000,
      message: "Description* ne doit pas etre vide.",
      mlmessage : "La description* ne doit pas depasser 5000 characteres."
     },
    {
      name : "type_contrat",
      mlength : 100,
      message: "Vous devez selectionner un type d'emploi",
      mlmessage : "Le type d'emploi du poste ne doit pas depasser 100 characteres."
    },
    {
      name : "env_de_travail",
      mlength : 100,
      message: "Vous devez selectionner un Environment de travail*",
      mlmessage : "Environment de travail* ne doit pas depasser 100 characteres."
    },
     {
      name : "horaire_de_travail",
      mlength : 100,
      message: "Vous devez selectionner un Horaire de Travail*",
      mlmessage : "Horaire de Travail* ne doit pas depasser 100 characteres."
    },
    {
      name : "periode_salaire",
      mlength : 100,
      message: "Vous devez selectionner un type de Salaire",
      mlmessage : "Salaire* ne doit pas depasser 100 characteres."
    },
  ];




  public async  addJob(e: any) {

    const rep: any = await checkValidator (this.job, this.val, e);
    if (rep.error) {
       this.aUI.show({ active : true, message : rep.message , type: "danger", pos: 'top-right', time: 4000 });
       toggleButton(e, false);
       return;
    }
    const URL = getURL("memploi","add");
    this.crud.postRC(URL, { job: this.job, ent: this.selectedEnt, ad: this.selectedAd }, e).then((r) => {
     this.aUI.show({ active : true, message: 'Success' , type: "success", pos: 'top-right' });
     this.router.navigate(['/details-job/'+r.id]);
    }).catch((e) => {
      const msg = e.error.error.message;
      this.aUI.show({ active : true, message:msg , type: "danger", pos: 'top-right' });
      console.log(msg);
    });
  }





}
