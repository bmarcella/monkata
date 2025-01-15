import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import {
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarView,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { CustomEventTitleFormatter } from 'src/app/providers/custom-event-title-formatter';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
   providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    }]
})
export class HomeComponent implements OnInit {
  prog: any;
  fours=[];
  constructor(
    public nServ: AppService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = this.auth.currentUserValue;
    this.getPromo();
    this.cours = this.user.courses;
    if (this.user.promotion != null) {
        this.promo = this.user.promotion;
    }
  }
  cours = [];
  user: any;
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

  public doughnutChartLabels: Label[] = ['Etudiant', 'Enseignant', 'Personnel'];
  public doughnutChartData: MultiDataSet = [[], [], []];
  //
  public doughnutChartLabels2: Label[] = ['Fille', 'Garçon'];
  public doughnutChartData2: MultiDataSet = [[], [], []];

  public doughnutChartType: ChartType = 'doughnut';

  view: CalendarView = CalendarView.Month;

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  CalendarView = CalendarView;

  response1= { state: '', message: '', active: false };
  response20 = { state: '', message: '', active: false };
  code;
  pin;

  child: any;

  viewDate: Date = new Date();
  locale = 'fr';
  events: CalendarEvent[] = [
    {
      title: '',
      start: new Date(),
      color: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
     },
    },
  ];

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

  mpromo;
  nfrags;
PROMO;
cc = 0;
  getPromo() {
    if (this.user && this.user?.role?.name == 'STUDENT') {
     const url = `${environment.apiUrl}getPromoByCode/${this.user.current_promo}`;
     this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
        this.mpromo = data.data;
        this.getRealPromo();
        },
        (error) => {}
      );
    }
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
    this.getStat();
    this.getMNL();
    this.getChild();
  }

  getStat() {
    const url = `${environment.apiUrl}stat`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.data.af == null) {
            this.router.navigate(['/app/acad']);
          }
          this.af = data.data.af;
          this.ts = data.data.total_student;
          this.tf = data.data.total_fille;
          this.tg = data.data.total_garcon;
          this.tp = data.data.total_prof;
          this.tc = data.data.total_cours;
          this.tpp = data.data.total_pers;
          this.tpa = data.data.total_parent;
          this.doughnutChartData = [[this.ts, this.tp, this.tpp]];
          this.doughnutChartData2 = [[this.tf, this.tg]];
          if (this.af.promotion != null) {
            this.apromo = this.af.promotion;
          }
        },
        (error) => {}
      );
  }
getMNL() {
    const url = `${environment.apiUrl}countContacts`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
       this.cc = data.data;
        },
        (error) => {}
      );
  }

  getChild() {
    const id =  this.user.id;
    const url = `${environment.apiUrl}getStudentForParent/${id}`;
    this.nServ.getData(url).pipe(first())
      .subscribe(
        data => {
          this.child = data.data;
          console.log(data);
        },
        error => {
        }
      );
  }

 loading;
 addChild(code, pin) {
    const id =  this.user.id;
    const etat = (this.user.sexe === 'M') ? 1 : 2;
    code = code.toUpperCase();
    const url = `${environment.apiUrl}setChild/${id}/${code}/${etat}/${pin}`;
    this.nServ.getData(url).pipe(first()).subscribe(
        data => {
              console.log(data);
              this.response20.active = true;
              this.loading = false;
              if (!data.crash) {
               if(data.data>=1) {
                  this.response20.state = 'success';
                  this.response20.message = 'succès';
                  this.code ='';
                  this.pin  ='';
               } else {
                this.response20.state = 'danger';
                this.response20.message = 'Etudiant(e) non trouvé(e)';
               }
              } else {
                this.response20.state = 'danger';
                this.response20.message = data.message;
              }
              this.getChild();
        },
        error => {
              this.response20.active = true;
              this.loading = false;
              this.response20.state = 'danger';
              this.response20.message = 'erreur';
              this.getChild();
        }
      );
  }

delChild(id, i ) {
    // tslint:disable-next-line:no-conditional-assignment
    const etat = (this.user.sexe = 'M') ? 1 : 2;
    let data = {};
    if (etat) {
      data = { pere_id : null} ;
     } else  {
      data = { mere_id : null} ;
     }
    const url = `${environment.apiUrl}userEntities/${id}`;
    this.nServ.editData(url, data).pipe(first())
      .subscribe(
        data => {
          this.child.splice(i, 1);
        },
        error => {
        }
      );
  }

}
