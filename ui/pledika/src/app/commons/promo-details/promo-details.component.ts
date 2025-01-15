import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Etab } from '../config/Etab';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: "app-promo-details",
  templateUrl: "./promo-details.component.html",
  styleUrls: ["./promo-details.component.css"],
})
export class PromoDetailsComponent implements OnInit {
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
  user: any;
  constructor(
    private route: ActivatedRoute,
    private app: AppService,
    private auth: AuthenticationService
  ) {
    this.user = this.auth.currentUserValue;
  }
  tut: any;
  hcours: any[];
  ID: any;
  PROMO: any;
  frag: any = [];
  loading = false;
  nfrags: any;
  cconfig = false;
  econfig = false;
  newCours: any;
  cours = [];
  students: any;
  pstudents: any;
  jours = [];
  heure = [];
  fcheure=[];
  acloading;
  floading = [];
  fjour = [];
  fheure = [];
  fhjour = [];
  fhheure = [];
  moy;
  hloading = [];
  horaire: any[][];
  sexe: any = { m: 0, f: 0 };
  dd = [];
  df = [];
  dde = [];
  dfe = [];
  gdate = [];
  response = { state: "", message: "", active: false };
  response1 = { state: "", message: "", active: false };
  response2 = { state: "", message: "", active: false };
  profs: any;
  cprof: any;
  cnfrags = false;
  info = 0;
  not = { cible: "", message: "", titre: "" };
  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.getPromo(this.ID);
    this.getProf();
  }

  setTPS() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.PROMO.parcours.length; i++) {
      // tslint:disable-next-line: quotemark
      if (this.PROMO.parcours[i].sexe === "M") {
        this.sexe.m++;
      } else {
        this.sexe.f++;
      }
    }
  }
  getPromo(ID) {
    this.app
      .getData(`${environment.apiUrl}getPromo/${ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.PROMO = data.data;
          this.getNewCours(this.PROMO.code_niveau);
          this.hcours = this.PROMO.promo_cours;
          this.setTPS();
        },
        () => {}
      );
  }

 initCours() {
    this.app.getData(
        `${environment.apiUrl}initCours/${this.PROMO.id}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response.active = true;
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message =  data.message;
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        (error) => {
            this.response.active = true;
            this.response.state = 'danger';
            this.response.message = error;
         }
      );
  }

  addNewCours(item) {
    const url = `${environment.apiUrl}addCoursToPromoByProg/${this.ID}/${item.id}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response.active = true;
          if (data.data.length>0) {
            this.PROMO.promo_cours.push(...data.data);
            this.response.state = 'success';
            this.response.message = 'Succès. ';
          } else {
            this.response.state = 'danger';
            this.response.message = "Vous avez depassé le nombre maximal de cours, verifier le nombre de cours maximal.";
          }
        },
        () => {}
      );
  }

  getNewCours(p) {
    this.app
      .getData(`${environment.apiUrl}getProgByNiv/${p}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.newCours = data.data;
          // console.log(data.data);
        },
        () => {}
      );
  }

  initPromo() {
    this.loading = true;
    this.app
      .getData(`${environment.apiUrl}getFrag`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.nfrags = data.data;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }

  filtreNFrags(frag) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.PROMO.promofrag.length; i++) {
      if (this.PROMO.promofrag[i].share_code == frag.name) {
        return false;
      }
    }
    return true;
  }

  setFragment(frag, i) {
    if (this.filtreNFrags(frag)) {
      const idp = `${environment.apiUrl}promotions/${this.ID}`;
      const data = {
        promotion: idp,
        actived: frag.actived,
        reprise: frag.reprise,
        share_code: frag.name,
        base: frag.base,
        final_frag: frag.final_frag,
        code: this.PROMO.code + "-" + frag.name + "(" + this.PROMO.id + ")",
      };
      const url = `${environment.apiUrl}promoFrags`;
      this.app
        .setData(url, data)
        .pipe(first())
        .subscribe(
          // tslint:disable-next-line: no-shadowed-variable
          (data) => {
            this.nfrags.splice(i, 1);
            this.loading = false;
            this.PROMO.promofrag.unshift(data);
          },
          () => {
            this.loading = false;
          }
        );
    }
  }

  getCours(url) {
    this.app
      .getData(url.href)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cours = data._embedded.promo_courses;
          this.hcours = this.cours;
        },
        () => {}
      );
  }
  onKey(e) {
    const query = e.target.value;
    if (query != null && query !== "" && query !== undefined) {
      this.PROMO.promo_cours = this.filterItems(query);
    } else {
      this.PROMO.promo_cours = this.hcours;
    }
  }

  filterItems(searchTerm) {
    return this.PROMO.promo_cours.filter((item) => {
      return item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  editCours(item, i, jours, heure, fcheure) {
    if (this.loading || !jours || !heure || !fcheure) {
      return;
    }
    this.loading = true;
    const nheure = heure+"-"+fcheure;
    const $POST = {
      jours,
      heure_cours: nheure,
    };
    const url = `${environment.apiUrl}promo_courses/${item.id}`;
    this.app
      .editData(url, $POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          if (data != null) {
            this.PROMO.promo_cours[i].jours = jours;
            this.PROMO.promo_cours[i].heure_cours = nheure;
            this.hcours = this.PROMO.promo_cours;
          }
        },
        () => {
          this.loading = false;
        }
      );
  }

  delCours(item, i) {
    const url = `${environment.apiUrl}promo_courses/${item.id}`;
    this.app
      .delData(url)
      .pipe(first())
      .subscribe(
        () => {
          this.PROMO.promo_cours.splice(i, 1);
          this.hcours = this.PROMO.promo_cours;
        },
        () => {}
      );
  }

  addCoursToFrag(item, i) {
    if (this.floading[i]) {
      return;
    }
    this.floading[i] = true;
    const url = `${environment.apiUrl}addCoursToPromoFrag/${item.id}/${this.ID}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.floading[i] = false;
          this.setCours(i, data.data);
        },
        () => {
          this.floading[i] = false;
        }
      );
  }

  setCours(i, data) {
    data.forEach((d) => {
      this.PROMO.promofrag[i].frag_cours.push(d);
    });
  }




  addHCours(id, i, ci, j, h, f) {
    if (this.hloading[ci]) {
      return;
    }
    this.hloading[ci] = true;
    const POST = {
      frag_cours: `${environment.apiUrl}frag_courses/${id}`,
      heure_cours: h,
      jours: j,
      code: j + "-" + h + "-" + f,
    };
    const url = `${environment.apiUrl}hCourses`;
    this.app
      .setData(url, POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.hloading[ci] = false;
          this.PROMO.promofrag[i].frag_cours[ci].hcours.push(data);
        },
        () => {
          this.hloading[ci] = false;
        }
      );
  }

  delFragCours(id, pi, ci) {
    const url = `${environment.apiUrl}frag_courses/${id}`;
    this.app
      .delData(url)
      .pipe(first())
      .subscribe(
        () => {
          this.PROMO.promofrag[pi].frag_cours.splice(ci, 1);
        },
        () => {}
      );
  }
  delHCours(id, pi, ci, hi) {
    const url = `${environment.apiUrl}hCourses/${id}`;
    this.app
      .delData(url)
      .pipe(first())
      .subscribe(
        () => {
          this.PROMO.promofrag[pi].frag_cours[ci].hcours.splice(hi, 1);
        },
        () => {}
      );
  }

  overSetupPromo(state) {
    const POST = {
      setup_over: state,
    };
    const url = `${environment.apiUrl}promotions/${this.PROMO.id}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        () => {
          this.PROMO.setup_over = state;
        },
        () => {}
      );
  }
  completedPromo(state) {
    const POST = {
      completed: state,
    };
    const url = `${environment.apiUrl}promotions/${this.PROMO.id}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        () => {
          this.PROMO.completed = state;
        },
        () => {}
      );
  }

  overSetup(f, i) {
    const POST = {
      setup_over: true,
    };
    const url = `${environment.apiUrl}promoFrags/${f.id}?`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        () => {
          this.PROMO.promofrag[i].setup_over = true;
        },
        () => {}
      );
  }
  editDF(f, i, dd, df, dde, dfe) {
    const POST = {
      date_debut: dd,
      date_fin: df,
      date_debut_ex: dde,
      date_fin_ex: dfe,
    };
    const url = `${environment.apiUrl}promoFrags/${f.id}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        () => {
          this.response.message = "Les dates ont été modifiée avec succès";
          this.response.active = true;
          this.response.state = "success";
        },
        () => {
          this.response.message = "Les dates n'ont pas été  modifiée";
          this.response.active = true;
          this.response.state = "danger";
        }
      );
  }

  activator(f, state) {
    const POST = {
      actived: state,
    };
    const url = `${environment.apiUrl}promoFrags/${f.id}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        () => {
          this.PROMO.promofrag.actived = state;
        },
        () => {}
      );
  }
  closeExamen(id, i, ci, state) {
    const POST = {
      examen: state,
    };
    const url = `${environment.apiUrl}frag_courses/${id}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        () => {
          this.PROMO.promofrag[i].frag_cours[ci].examen = state;
        },
        () => {}
      );
  }
  setDate(date) {
    const nd = new DatePipe("en-US").transform(date, "yyyy-MM-dd");
    return nd;
  }

  actPromo(state) {
    const POST = {
      enabled: state,
    };
    const url = `${environment.apiUrl}promotions/${this.ID}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        () => {
          this.PROMO.enabled = state;
          // tslint:disable-next-line:no-shadowed-variable
          const url = `${environment.apiUrl}closeParcours/${this.ID}/${state}`;
          this.app
            .getData(url)
            .pipe(first())
            .subscribe(() => {});
        },
        () => {}
      );
  }

  editMoy() {
    const POST = {
      moy_total: this.PROMO.moy_total,
      moy_accept: this.PROMO.moy_accept,
      moy_reprise: this.PROMO.moy_reprise,
      moy_exc: this.PROMO.moy_exc,
    };
    const url = `${environment.apiUrl}promotions/${this.ID}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response.message = "Les moyennes ont été modifiées avec succès";
          this.response.active = true;
          this.response.state = "success";
        },
        () => {
          this.response.message = "Les moyennes n'ont pas été  modifiées";
          this.response.active = true;
          this.response.state = "danger";
        }
      );
  }
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
  }
  setBoard() {
    const POST = {
      board: this.PROMO.board,
    };
    const url = `${environment.apiUrl}setBoard/${this.ID}`;
    this.app
      .setData(url, POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response1.message = data.message;
          this.response1.active = true;
          if (!data.crash) {
            this.response1.state = "success";
          } else {
            this.response1.state = "success";
          }
        },
        (error) => {
          this.response1.message = error;
          this.response1.active = true;
          this.response1.state = "danger";
        }
      );
  }
  baseFrag(state, id, i) {
    const POST = {
      base: state,
    };
    const url = `${environment.apiUrl}promoFrags/${id}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.PROMO.promofrag[i].base = state;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  actFrag(state, id, i) {
    const POST = {
      actived: state,
    };
    const url = `${environment.apiUrl}promoFrags/${id}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        () => {
          this.PROMO.promofrag[i].actived = state;
        },
        () => {}
      );
  }

  delFrag(id, i) {
    const url = `${environment.apiUrl}promoFrags/${id}`;
    this.app
      .delData(url)
      .pipe(first())
      .subscribe(
        () => {
          this.PROMO.promofrag.splice(i, 1);
        },
        () => {}
      );
  }

 initResult(id) {
    this.response.active = false;
    const url = `${environment.apiUrl}initResults/${id}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          if (!data.crash) {
          } else {
            this.response.active = true;
            this.response.message = data.message;
            this.response.state = "danger";
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = "danger";
          this.response.message = error;
        }
      );
  }

  getProf() {
    const url = `${environment.apiUrl}getProfByRole`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.profs = data.data.users;
          console.log(data);
        },
        (error) => {}
      );
  }

  setTut(cprof) {
    const POST = {
      titulaire: `${environment.apiUrl}userEntities/${cprof}`,
    };
    const url = `${environment.apiUrl}promotions/${this.ID}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
        },
        () => {}
      );
  }

  envoyer() {
    if (!this.loading) {
      if (this.not.titre == "" || this.not.message == "") {
        this.loading = false;
        this.response2.active = true;
        this.response2.state = "danger";
        this.response2.message = "Veuillez remplir tous les champs.";
        return;
      }
      this.loading = true;
      const url = `${environment.apiUrl}addNot/${this.ID}`;
      this.app
        .setData(url, this.not)
        .pipe(first())
        .subscribe(
          (data) => {
            this.loading = false;
            this.response2.active = true;
            if (!data.crash) {
              this.response2.state = "success";
              this.response2.message = "Notification envoyée";
              this.not = { cible: "", message: "", titre: "" };
            } else {
              this.response2.state = "danger";
              this.response2.message = data.message;
            }
          },
          (error) => {
            this.loading = false;
            this.response2.active = true;
            this.response2.state = "danger";
            this.response2.message = "erreur serveur";
          }
        );
    }
  }

  iloading = false;

  initStudent() {
    let i = 0;
    this.PROMO.promofrag.forEach((item) => {
    if(!item.reprise){
      this.init(item.id);
      i++;
     }
    });
  }
  init(IDF) {
    this.app
      .getData(`${environment.apiUrl}addStudentToPromoFrag/${IDF}/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {}
      );
  }
}
