import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CalendarView, DAYS_OF_WEEK, CalendarEvent } from 'angular-calendar';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-petudiants',
  templateUrl: './petudiants.component.html',
  styleUrls: ['./petudiants.component.css']
})
export class PetudiantsComponent implements OnInit {

    prog: any;
    fours=[];
  constructor(
    public nServ: AppService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.nuser = this.auth.currentUserValue;

  }
  cours = [];
  user: any;
  nuser: any;
  af: any;
  ts: any;
  tp: any;
  tf: any;
  tg: any;
  tpp: any;
  tc: any;
  tpa:any;
  apromo = [];
  promo = [];

  
  response1= { state: '', message: '', active: false };
  response20 = { state: '', message: '', active: false };
  code;
  pin;

  child: any;

editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '400',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

  viewDate: Date = new Date();
  locale = 'fr';


mpromo;
nfrags;
PROMO;
cc = 0;
  getPromo() {
     const url = `${environment.apiUrl}getPromoByCode/${this.user.current_promo}`;
     this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
        this.mpromo = data.data;
        this.getPaiment(this.user.code,this.mpromo.code);
        this.getVerse(this.mpromo.id);
        this.getRealPromo();
        },
        (error) => {}
      );
  }
 getRealPromo() {
    const url = `${environment.apiUrl}promotions/${this.mpromo.id}`;
    this.nServ.getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.PROMO = data;
          this.getFrags(this.PROMO._links.promofrag.href);
          this.getProg(this.PROMO.prog_id);
        },
        () => {}
      );
  }

getProg(id) {
 const url = `${environment.apiUrl}programmes/${id}`;
 this.nServ.getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.prog = data;
          this.getCourses(data._links.course.href);
          this.getFour(data._links.progfourniture.href);
        },
        () => {
        }
      );
  }

getCourses(url) {
this.nServ.getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cours = data._embedded.courses;
          console.log(data);
        },
        () => {
        }
      );
  }

getFour(url) {
this.nServ.getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.fours = data._embedded.progFournitures;
          console.log(data);
        },
        () => {
        }
      );
  }


getFrags(url) {
console.log(url);
this.nServ.getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.nfrags = data._embedded.promoFrags;
        },
        () => {
        }
      );
  }
  ngOnInit() {
      this.ID = this.route.snapshot.params.id;
      this.getStudentData();
  }


verses=[];

getStudentData() {
 const url = `${environment.apiUrl}userEntities/${this.ID}`;
 this.nServ.getData(url)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.user = data;
          console.log(data);
          this.getPromo();
        },
        (error) => {
           console.log(error);
        }
      );
  }
 pay=[];
 getPaiment(code,promo){
  const url = `${environment.apiUrl}getPaiement/${code}/${promo}`;
  this.nServ.getData(url)
        .pipe(first())
        .subscribe(
          data => {
            this.pay = data.data;
            
          },
          () => {
          }
        );
 }

  getVerse(idp) {
  const url = `${environment.apiUrl}getPVersement/${idp}/${this.ID}`;
  this.nServ.getData(url)
        .pipe(first())
        .subscribe(
          data => {
            this.verses = data.data;
          },
          () => {
          }
        );

  }
 ID;
 loading;
}
