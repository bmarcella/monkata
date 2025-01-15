import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Etab } from './Etab';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private app: AppService) {
   this.etab = new Etab();
  }
  etab: Etab;
  loading;
  info = 1;
  response = { state: '', message: '', active: false };
  not = { cible: '', message: '', titre: ''};
  divs: any;
  edit = [];
  msg = [];
  note = [];
  uploadForm: any;
  currentFileUpload: any;

  imgs = [];
@Output()
emitEtab: EventEmitter<any> = new EventEmitter<any>();
progress;



  logo;

nivs = [];

type_not ;
numbers;
  ngOnInit() {
  for (let i = 1; i <= 10; i++) {
     this.imgs.push(i);
   }
  this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  this.getEtabInfo();
  this.not = { cible: '', message: '', titre: '' };
  this.getAD();
  this.getNiv() ;
  }

  setImg(i) {
    // tslint:disable-next-line: prefer-const
    let img =  `bg_${i}.png`;
    this.etab.background = img;
    this.getBG(img);
  }
  setLogo(id) {
     this.logo = (id != null) ? `${environment.apiUrl}getFiles/${id}` : undefined;
  }
  getBG(img) {
    const url = `${environment.apiUrl}etablissements/${this.etab.code}`;
    const DATA = {
      background: img
    };
    this.app.editData(url, DATA)
      .pipe(first())
      .subscribe(
        data => {
          this.etab = data;
        },
        error => {
        }
      );
  }

getNiv() {
    const url = `${environment.apiUrl}niveaus`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.nivs = data._embedded.niveaus;
        },
        error => {
        }
      );
  }


  getAD() {
    const url = `${environment.apiUrl}fragments`;
    this.app.getData(url)
      .pipe(first())
      .subscribe(
        data => {
          this.divs = data._embedded.fragments;
        },
        error => {
        }
      );
  }

toggleDiv(d, s, i) {
  const url = `${environment.apiUrl}fragments/${d.id}`;
  this.app.editData(url, s)
      .pipe(first())
      .subscribe(
        data => {
          this.divs[i] = data;
        },
        error => {
        }
      );
  }

  getEtabInfo() {
    this.app.getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        data => {
          this.etab = data._embedded.etablissements[0];
          this.setLogo(this.etab.id_img);
          this.emitEtab.emit(this.etab);
        },
        error => {
        }
      );
  }

 config() {
   const etab = this.etab;
   etab.over_config = true;
   const url = `${environment.apiUrl}etablissements/${this.etab.code}`;
   this.app.editData(url, etab)
     .pipe(first())
     .subscribe(
       data => {
             this.etab = data;
             localStorage.setItem('etab', JSON.stringify(this.etab));
             this.loading = false;
             this.response.active = true;
             this.response.state = 'success';
             this.response.message = 'Configuration effectuée';
        },
       error => {
           this.response.active = true;
           this.response.state = 'danger';
           this.response.message = 'erreur serveur';

       }
     );
 }
envoyer() {

if (this.type_not === 2 || this.type_not==="2") {
  this.sendSms();
  return;
}
if (!this.loading) {
this.loading = true;
const url = `${environment.apiUrl}addNot`;
this.app.setData(url, this.not)
    .pipe(first())
    .subscribe(
      data => {
        this.loading = false;
        this.response.active = true;
        if (!data.crash) {
        this.response.state = 'success';
        this.response.message = 'Notification envoyée';
       } else {
         this.response.state = 'danger';
         this.response.message = data.message;
       }
      },
      error => {
        this.loading = false;
        this.response.active = true;
        this.response.state = 'danger';
        this.response.message = 'erreur serveur';

      }
    );
  }

}
  sendSms() {
     const lnum = this.numbers.split('/');
     for (const num of lnum) {
       // tslint:disable-next-line:max-line-length
       const url = `${this.etab.smsGateway}SendSMS?phone=${num}&username=${this.etab.usernameGateway}&password=${this.etab.passGateway}&message=${this.not.message}`;
       console.log(url);
       this.app.getData(url)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.response.active = true;
        if (!data.crash) {
        this.response.state = 'success';
        this.response.message = 'Notification envoyée';
       } else {
         this.response.state = 'danger';
         this.response.message = data.message;
       }
      },
      error => {
        this.loading = false;
        this.response.active = true;
        this.response.state = 'danger';
        this.response.message = 'erreur serveur';

      }
    );
  }

  }

getImg(img: any) {
    return `${environment.resUrl}${img}`;
  }
getLocalImg(img: any) {
    return `assets/logo/${img}`;
  }

onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }
onSubmit() {
    const formData = new FormData();
    this.progress = 0;
    this.currentFileUpload = this.uploadForm.get('profile').value;
    // tslint:disable-next-line:radix
    const id = this.etab.code;
    const id_img = (this.etab.id_img != null) ? this.etab.id_img : 0;
    this.logo = undefined;
    // tslint:disable-next-line: radix
    const url = `${environment.apiUrl}uploadEtabLogo?code=${id}&id_img=${id_img}`;
    this.app.upload(url, this.currentFileUpload).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.progress = false;
          const data: any = event.body;
          if (!data.crash) {
            this.etab.logo =  data.data[0];
            this.etab.id_img = null;
            this.etab.id_img = data.data[1];
            this.setLogo(this.etab.id_img);
          }
        }
      }
    , err => {
     console.log(err);
    });
  }

}
