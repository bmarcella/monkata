import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-config-promo',
  templateUrl: './config-promo.component.html',
  styleUrls: ['./config-promo.component.css'],
})
export class ConfigPromoComponent implements OnInit {
  [x: string]: any;
  constructor(
    public app: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  response = { state: '', message: '', active: false };
  response1 = { state: '', message: '', active: false };
  af: any;
  apromo = [];
  cpromo = {
    max_cours: 0,
    max_student: 100,
    promofrag: [],
    moy_accept: 0,
    moy_exc: 0,
    moy_reprise: 0,
    moy_total: 0,
    prog_id: 0,
    id: 0,
    code: '',
    code_niveau: '',
  };
  tpromo: number;
  index: number;
  ID: any;
  PROMO: any;
  newCours: any;
  hcours: any;
  afrags = [];
  nfrags = [];

  profs;
  cprof;
  loading = false;
  floading = [];

  see;

  iloading = false;

  ngOnInit() {
    this.getProf();
    this.initPromo();
  }

  initPromo() {
    this.loading = true;
    this.app
      .getData(`${environment.apiUrl}getFrag`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.afrags = data.data;
          this.loading = false;
          this.getAF();
        },
        () => {
          this.loading = false;
        }
      );
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
          const url = `${environment.apiUrl}closeParcours/${this.ID}/${state}`;
          this.app
            .getData(url)
            .pipe(first())
            .subscribe(() => {});
        },
        () => {}
      );
  }

  setFragment(frag, i) {
    const idp = `${environment.apiUrl}promotions/${this.ID}`;
    const data = {
      promotion: idp,
      actived: frag.actived,
      reprise: frag.reprise,
      share_code: frag.name,
      base: frag.base,
      final_frag: frag.final_frag,
      code: this.PROMO.code + '-' + frag.name + '(' + this.PROMO.id + ')',
    };
    const url = `${environment.apiUrl}promoFrags`;
    this.app
      .setData(url, data)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        (data) => {
          this.nfrags.splice(i, 1);
          this.PROMO.promofrag.push(data);
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.nfrags.splice(i, 1);
        }
      );
  }

 initCoursAndStudent(){

  }
  getProf() {
    const url = `${environment.apiUrl}getProfByRole`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.profs = data.data.users;
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
        (data) => {},
        () => {}
      );
  }
  getAF() {
    const url = `${environment.apiUrl}getPromoByAF`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          if (!data.crash) {
            this.apromo = data.data;
            if (this.apromo.length === 0) {
              this.router.navigate(['/app/management']);
            }
            this.tpromo = this.apromo.length;
            this.index = 1;
            this.arrange();
          } else {
            this.router.navigate(['/app/management']);
          }
        },
        (error) => {
          this.router.navigate(['/app/management']);
        }
      );
  }
  next() {
    this.index++;
    this.arrange();
  }
  prev() {
    --this.index;
    this.arrange();
  }
  arrange() {
    this.see = undefined;
    this.cindex = this.index - 1;
    const cpromo = this.apromo[this.index - 1];
    this.ID = cpromo.id;
    this.nfrags = [];
    this.nfrags.push(...this.afrags);
    if (this.cpromo.code_niveau) {
      this.getNewCours(this.cpromo.code_niveau);
    }
    this.getPromo(this.ID);
    window.scroll(0, 0);
  }

arrangeNew(i) {
    this.see = undefined;
    this.index = i+1;
    const cpromo = this.apromo[i];
    this.ID = cpromo.id;
    this.nfrags = [];
    this.nfrags.push(...this.afrags);
    if (this.cpromo.code_niveau) {
      this.getNewCours(this.cpromo.code_niveau);
    }
    this.getPromo(this.ID);
    window.scroll(0, 0);
  }

  getPromo(ID) {
    this.app
      .getData(`${environment.apiUrl}getPromo/${ID}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.PROMO = data.data;
          this.cpromo = this.PROMO;
        },
        () => {}
      );
  }

 initCours() {
    this.app
      .getData(
        `${environment.apiUrl}initCours/${this.cpromo.id}`)
      .pipe(first())
      .subscribe(
        (data) => {
        },
        (error) => {}
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
          this.response.message = 'Les cours ont été ajoutés avec succès';
          this.response.active = true;
          this.response.state = 'success';
          this.floading[i] = false;
        },
        (error) => {
          this.floading[i] = false;
          this.response.message = error;
          this.response.active = true;
          this.response.state = 'danger';
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
        },
        () => {}
      );
  }

  del(item) {
    const url = `${environment.apiUrl}promotions/${item}`;
    this.app
      .delData(url)
      .pipe(first())
      .subscribe(
        () => {
          this.apromo.splice(this.index - 1, 1);
          this.arrange();
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
            this.response.state = 'danger';
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
    const url = `${environment.apiUrl}addCoursToPromoByProg/${this.ID}/${item}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data.data);
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
        (error) => {
          this.response.message = error;
          this.response.active = true;
          this.response.state = 'danger';
        }
      );
  }

 cindex;

  getNewCours(p) {
    this.app
      .getData(`${environment.apiUrl}getProgByNiv/${p}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.newCours = data.data;
          console.log(data);
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
          this.response.message = 'Les moyennes ont été modifiées avec succès';
          this.response.active = true;
          this.response.state = 'success';
        },
        (error) => {
          this.response.message = error;
          this.response.active = true;
          this.response.state = 'danger';
        }
      );
  }

  initStudent() {
    if (!this.loading) {
      this.loading = true;
      let i = 0;
      this.PROMO.promofrag.forEach((item) => {
       if(!item.reprise){
        this.init(item.id);
        i++;
       }
      });
      this.loading = false;
    }
  }

  init(IDF) {
    this.app
      .getData(`${environment.apiUrl}addStudentToPromoFrag/${IDF}/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {},
        (error) => {}
      );
  }

setup() {
    this.app
      .getData(`${environment.apiUrl}arrangePars/${this.ID}`)
      .pipe(first())
      .subscribe(
        (data) => {},
        (error) => {}
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

editShareCode(item, i) {
    const url = `${environment.apiUrl}promoFrags/${item.id}`;
    const code = this.cpromo.code + '-' + item.share_code + '(' + this.cpromo.id + ')';
    this.app.editData(url, {code, share_code: item.share_code})
      .pipe(first())
      .subscribe(
        (data) => {
           this.PROMO.promofrag[i].code = code;
        },
        (e) => { console.log(e); }
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

  editMax() {
    const POST = {
      max_student: this.PROMO.max_student,
    };
    const url = `${environment.apiUrl}promotions/${this.ID}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response.message = 'Max etudiant  modifié avec succès';
          this.response.active = true;
          this.response.state = 'success';
        },
        (error) => {
          this.response.message = error;
          this.response.active = true;
          this.response.state = 'danger';
        }
      );
  }

editMaxC() {
    const POST = {
      max_cours: this.PROMO.max_cours,
    };
    const url = `${environment.apiUrl}promotions/${this.ID}`;
    this.app
      .editData(url, POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.response.message = 'Max cours modifié avec succès';
          this.response.active = true;
          this.response.state = 'success';
        },
        (error) => {
          this.response.message = error;
          this.response.active = true;
          this.response.state = 'danger';
        }
      );
  }
  toggleRDiv(d, s, t) {
    const url = `${environment.apiUrl}promotions/${d.id}`;
    this.app
      .editData(url, s)
      .pipe(first())
      .subscribe(
        (data) => {
          this.PROMO.reprise = t;
        },
        (error) => {}
      );
  }
}
