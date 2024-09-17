import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Type_Categorie } from 'src/app/admin/categorie/categorie.component';
import {
  checkValidator,
  toggleButton,
  Val,
} from 'src/app/core/Validator';
import { AlertService } from 'src/app/service/alert.service';
import { CategorieService } from 'src/app/service/categorie.service';
import { CrudService } from 'src/app/service/crud.service';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { getURL } from 'src/environments/environment.prod';

export  type Entreprise = {
  name: string,
  description: string,
  objectif: string,
  mission: string,
  vision: string,
  telephone_a: string,
  telephone_b: string,
  email_contact:string,
  adresse: {
    country : string,
    state : string,
    city : string,
    street: string,
  }
  categorie : string,
  appName : string,
};

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css'],
})
export class AddEntComponent {
  entreprise : Entreprise  = {
    name: '',
    description: '',
    objectif: '',
    mission: '',
    vision: '',
    telephone_a: '',
    telephone_b: '',
    email_contact: '',
    adresse: {
        country : '',
        state : '',
        city :  '',
        street: '',
    },
    categorie:'',
    appName:'Memploi'
  };

  type_ent  = [
    { value: 'services', viewValue: 'Services' },
    { value: 'produit', viewValue: 'Produits' },
  ];

  init (){
    this.entreprise = {
      name: '',
      description: '',
      objectif: '',
      mission: '',
      vision: '',
      telephone_a: '',
      telephone_b: '',
      email_contact: '',
      adresse: {
          country : '',
          state : '',
          city :  '',
          street: '',
      },
      categorie:'',
      appName:'Memploi'
    };
  }

  country= [
    { value: 'Haiti', viewValue: 'Haiti', code: 'HTI' },
  ];

  depts = ["Ouest", "Nord" , "Nord-Est", "Nord-Ouest", "Artibonite", "Centre", "Grand'Anse", "Nippes", "Sud", "Sud-Est"];

  ents: any;
  cats: any = [];
  user: any;
  ready = false;
  constructor( public router: Router,private auth: KeycloakService, private crud: CrudService, private aUI:  AlertService, private cat: CategorieService) {}

  ngOnInit(): void {
    this.getEntreprises();
    this.getCats();
    // this.post(undefined);
  }

  post(e){
    this.user = this.auth.profil();
    if (!this.user) {
      const url =  "/jobs/add-ent";
      this.crud.loginWithReturn(url,e);
    } else {
      this.ready = true;
    }
  }
  public getEntreprises() {
    const URL = getURL("users","entreprise/getAll");
    this.crud.get(URL).then((r) => {
    this.ents = r;
    }).catch((e) => console.log(e));
  }
   val : Val[]  = [
    {
     name : "name",
     mlength : 50,
     message: "Le nom de l'entreprise ne doit pas etre vide.",
     mlmessage : "Le nom de l'entreprise ne doit pas depasser 50 characteres."
    },
    {
      name : "categorie",
      mlength : 100,
      message: "Vous devez selectionner un categorie",
      mlmessage : "Le categorie ne doit pas depasser 100 characteres."
    },
    {
      name : "description",
      mlength : 2000,
      message: "Description* ne doit pas etre vide.",
      mlmessage : "La Description* ne doit pas depasser 2000 characteres."
     },
    {
      name : "telephone_a",
      mlength : 15,
      message: "Vous devez ajouter le telephone Principal*",
      mlmessage : "Telephone Principal* ne doit pas depasser 15 characteres."
    },
    {
      name : "email_contact",
      mlength : 255,
      message: "Vous devez ajouter l'email de contact",
      mlmessage : "Email de contact ne doit pas depasser 255 characteres."
    },

  ];

  val_ad : Val[]  = [
    {
      name : "country",
      mlength : 100,
      message: "Vous devez selectionner un pays",
      mlmessage : "Le pays ne doit pas depasser 100 characteres."
    },
    {
      name : "state",
      mlength : 100,
      message: "Vous devez selectionner un Etat/Departement*",
      mlmessage : "Etat/Departement* ne doit pas depasser 100 characteres."
    },
    {
      name : "city",
      mlength : 100,
      message: "Vous devez selectionner une ville",
      mlmessage : "La ville ne doit pas depasser 100 characteres."
    },
    {
      name : "street",
      mlength : 255,
      message: "Rue* ne doit pas etre vide.",
      mlmessage : "La rue* ne doit pas depasser 255 characteres."
     },

  ];
  public async addEnt(e: any) {
    const rep: any = await checkValidator (this.entreprise, this.val, e);
    if (rep.error) {
       this.aUI.show({ active : true, message : rep.message , type: "danger", pos: 'top-right', time: 4000 });
       toggleButton(e, false);
       return;
    }

    const a: any = await checkValidator (this.entreprise.adresse, this.val_ad, e);
    if (a.error) {
       this.aUI.show({ active : true, message : a.message , type: "danger", pos: 'top-right', time: 4000 });
       toggleButton(e, false);
       return;
    }
    const URL = getURL("users","entreprise/add");
    this.crud.postRC(URL, this.entreprise, e).then((r) => {
     this.aUI.show({ active : true, message: 'Success' , type: "success", pos: 'top-right' });
     this.init();
     this.router.navigate(['/compagny/home']);
    }).catch((e) => {
      this.aUI.show({ active : true, message: e , type: "danger", pos: 'top-right' });
      console.log(e);
    });

  }

  public getCats() {
    this.cat.getCatforEnt(Type_Categorie[1]).then((r) => {
    this.cats = r;
    }).catch((e) => console.log(e));
  }
}
