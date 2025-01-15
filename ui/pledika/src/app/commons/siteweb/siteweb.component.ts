import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { AppService } from 'src/app/_Services/app.service';
import { Etab } from './Etab';

@Component({
  selector: 'app-siteweb',
  templateUrl: './siteweb.component.html',
  styleUrls: ['./siteweb.component.css']
})
export class SitewebComponent extends Etab implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private app: AppService
  ) {
    super();
  }
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  response = { state: '', message: '', active: false };
  etab: any;
  url: any;
  prod = environment.production;
  node = environment.node;

  logo;

  c = {name: '', email: '', phone: '', message: ''};

  ngOnInit() {
    this.url = sessionStorage.getItem('url_backend');
    this.initBackend();
  }
  initBackend() {
   if (this.url != null || !environment.node) {
      this.getEtabInfo();
    } else {
      this.setBackend();
    }
  }

  // convenience getter for easy access to form fields

  getEtabInfo() {
    this.app.getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        data => {
          this.etab = data._embedded.etablissements[0];
          this.setLogo(this.etab.id_img);
          this.saveEtab(this.etab, this.app);
        },
        error => {
        }
      );
  }


async setBackend() {
    this.app.setBackend()
      .pipe(first())
      .subscribe(
        data => {
          sessionStorage.setItem('url_backend', data.url);
          this.url = data.url;
        },
        error => {
        }
      );
  }
  setLogo(id) {
     this.logo = (id != null) ? `${environment.apiUrl}getFiles/${id}` : undefined;
  }
  getLocalImg(img: any) {
    return `assets/logo/${img}`;
  }

  setBG(bg) {
    return `assets/bg/${bg}`;
  }

   addContact() {
  if (this.c.phone.length !== 8 && this.c.phone.length !== 11) {
         this.response.active = true;
         this.response.state = 'danger';
         this.response.message = 'Vous devez respecter ces formats 38151294 ou 50938151294.';
         return;
    }
  if (this.c.email === '' || this.c.phone === '') {
         this.response.active = true;
         this.response.state = 'danger';
         this.response.message = 'Vous ajouter votre email et votre numero de telephone.';
         return;
    }
  this.app.setData(`${environment.apiUrl}contacts`, this.c)
      .pipe(first())
      .subscribe(
        data => {
      this.response.active = true;
      if (data != null) {
          this.response.state = 'success';
          this.response.message = 'Merci de nous avoir contacter, dans moins de 24H un membre de notre etablissement vous contactera.';
          this.c = {name: '', email: '', phone: '', message: ''};
          } else {
            this.response.state = 'danger';
            this.response.message = 'Erreur serveur';
         }
        },
        error => {
         this.response.active = true;
         this.response.state = 'danger';
         this.response.message = error;
        }
      );
  }
}
