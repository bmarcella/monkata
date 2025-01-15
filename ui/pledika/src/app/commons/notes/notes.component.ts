import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import * as GC from '@grapecity/spread-sheets';
import { Result } from './Result';
import { User } from './User';
import * as Excel from '@grapecity/spread-excelio';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  salles: any;
  vacs: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private app: AppService
  ) {
    this.user = this.authenticationService.currentUserValue;
    if (this.user.role.name !== 'ADMIN' && this.user.role.name !== 'MASTER') {
      this.router.navigate(['/app/home']);
    }
    this.excelIO = new Excel.IO();
  }
  cycles: any;
  villes: any;
  docs: any;
  importResultsUser: User[];
  userRemain;
  importResults: any[];
  acs: any;
  etab: any;
  results = [];
  user: any;
  nivs = [];
  rnivs = [];
  cniv;
  crniv;
  promos = [];
  cpromo: any;
  frags = [];
  cfrag;
  cours = [];
  ccours;

  loading;
  hloading;
  msg = [];
  frag_cours = [];
  hresults = [];
  note = [];
  ccycle;
  iloading;
  // tslint:disable-next-line: member-ordering
  index = 100;
  spreadBackColor = 'aliceblue';
  hostStyle = {
    width: '95vw',
    height: '80vh',
  };
  excelIO;
  response2 = { state: '', message: '', active: false };
  response3 = { state: '', message: '', active: false };
  response4 = { state: '', message: '', active: false };
  /*name of the excel-file which will be downloaded. */
  fileName = '';

  edit = [];
  @ViewChild('fileExcel', {static: true}) fileExcel: ElementRef;

  private spread: GC.Spread.Sheets.Workbook;
 ac;
  response = { state: '', message: '', active: false };

 bedit = false;
  lpromo = false;
 reset() {
  this.userRemain = undefined;
}

  getSalle() {
    this.app.getData(`${environment.apiUrl}salles?size=1000`)
      .pipe(first())
      .subscribe(
        data => {
          this.salles = data._embedded.salles;
        },
        error => {
        }
      );
  }


  onFileChange(args) {
    const self = this;
    const file =
      args.srcElement && args.srcElement.files && args.srcElement.files[0];
    const f = file.name.split('.');
    const ext = f[f.length - 1];
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const data = this.importFromFile(bstr) as any[];

      const header: string[] = Object.getOwnPropertyNames(new Result());
      const importedData = data.slice(1, -1);

      this.importResults = importedData.map((arr) => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        console.log(obj);
        return obj as Result;
      });
    };
    reader.readAsBinaryString(file);
  }

  upload() {
if (!this.loading) {
    this.loading = true;
    console.log(this.importResults);
    const DATA = {
      results: this.importResults,
    };
    this.app
      .setData(`${environment.apiUrl}setListResults`, DATA)
      .pipe(first())
      .subscribe(
        (data) => {
       this.loading = false;
       this.response2.active = true;
       if (!data.crash) {
            this.changeCours();
            this.response2.state = 'success';
            this.response2.message = data.message;
          } else {
          this.response2.state = 'danger';
          this.response2.message = data.message;
          }
        },
        (error) => {
          this.loading = false;
          this.response2.active = true;
          this.response2.state = 'danger';
          this.response2.message = error;
       }
      );
  }
  }

  ngOnInit() {
    this.getOptions();
    this.getAC();
    this.getEtabInfo();
    this.getSalle();
    this.getVacation();
  }

 getVacation() {
    this.app.getData(`${environment.apiUrl}vacations`)
      .pipe(first())
      .subscribe(
        data => {
          this.vacs = data._embedded.vacations;
        },
        error => {
        }
      );

  }

  addNewNR(e) {
    this.rnivs.push(e.data);
  }

  getAC() {
    this.app.getData(`${environment.apiUrl}promo_afs?actived=true`)
      .pipe(first())
      .subscribe(
        data => {
          this.acs = data._embedded.promo_afs;
        },
        error => {
        }
      );
  }
  getContext() {
    this.app.getData(`${environment.apiUrl}context`)
      .pipe(first())
      .subscribe(
        data => {
          this.villes = data.data.vis;
          this.docs = data.data.nivs;
        },
        error => {
        }
      );

  }
  genPromo() {
if (!this.lpromo) {
  this.lpromo = true;
  this.app.getData(`${environment.apiUrl}genPromo`)
      .pipe(first())
      .subscribe(
        data => {
          this.lpromo = false;
          this.response.active = true;
          if (!data.crash) {
            this.response.state = 'success';
            this.response.message = data.message;
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        error => {
          this.lpromo = false;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
        }
      );
}

  }

  getOptions() {
    this.app
      .getData(`${environment.apiUrl}options`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cycles = data._embedded.options;
        },
        (error) => { }
      );
  }


  getClasse(url) {
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.nivs = data._embedded.niveaus;
        },
        (error) => {}
      );
  }

  cchange() {
    this.nivs = [];
    this.cniv = null;
    this.rnivs = [];
    this.crniv = null;
    this.promos = [];
    this.cpromo = null;
    this.frags = [];
    this.cfrag = null;
    this.cours = [];
    this.ccours = null;
    this.getClasse(this.ccycle._links.niveau.href);
  }

  change() {
    this.rnivs = [];
    this.crniv = null;
    this.promos = [];
    this.cpromo = null;
    this.frags = [];
    this.cfrag = null;
    this.cours = [];
    this.ccours = null;
    this.getRelClasse(this.cniv._links.niveau_rel.href);
  }
  changeRel() {
    this.promos = [];
    this.cpromo = null;
    this.frags = [];
    this.cfrag = null;
    this.cours = [];
    this.ccours = null;
    this.getPromo(this.crniv.id);
  }
  getRelClasse(url) {
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.rnivs = data._embedded.niveau_rels;
        },
        (error) => {}
      );
  }

  getPromo(u) {
   const url = `${environment.apiUrl}getPromoByAFAndNivRel/${u}`;
   this.app.getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.promos = data.data;
        },
        (error) => {}
      );
  }


  changePromo() {
    this.frags = [];
    this.cfrag = null;
    this.cours = [];
    this.ccours = null;
    this.getFrags(this.cpromo.id);
  }

  getFrags(u) {
  const url = `${environment.apiUrl}promotions/${u}/promofrag`;
  console.log(url);
  this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.frags = data._embedded.promoFrags;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  changeFrag() {
    this.cours = [];
    this.ccours = null;
    this.getCours(this.cfrag._links.frag_cours.href);
  }

  getCours(url) {
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cours = data._embedded.frag_courses;
        },
        (error) => {}
      );
  }

  changeCours() {
    this.getResults(this.ccours._links.results.href);
  }
  getResults(url) {
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.results = data._embedded.resultses;
          this.hresults = this.results;
        },
        (error) => {}
      );
  }

 editNote(a) {
 this.bedit = a;
 }

  initResults() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.app
      .getData(
        `${environment.apiUrl}initResult/${this.cfrag.id}/${this.ccours.id}`
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.results = data.data;
          this.hresults = this.results;
        },
        (error) => {
          this.loading = false;
        }
      );
  }




  setResults(item, i) {
    if (this.loading) {
      return;
    }
    this.msg[i] = null;
    this.note[i] = null;
    // tslint:disable-next-line: radix
    if (parseInt(item.note) <= parseInt(item.note_total)) {
      this.loading = true;
      const $_POST = {
        note: item.note,
      };
      this.app
        .editData(`${environment.apiUrl}resultses/${item.id}`, $_POST)
        .pipe(first())
        .subscribe(
          (data) => {
            // console.log(data);
            this.loading = false;
            this.results[i].note = data.note;
            this.hresults[i].note = data.note;
            this.note[i] =
              ' La nouvelle note de ' +
              item.nom +
              ' ' +
              item.pnom +
              ' est ' +
              item.note +
              '/' +
              item.note_total;
          },
          (error) => {
            this.loading = false;
          }
        );
    } else {
      this.msg[i] = 'La note doit être inferieur a ' + item.note_total + ' ';
    }
  }
  onKey(e) {
    const query = e.target.value;
    if (query != null && query !== '' && query !== undefined) {
      this.results = this.filterItems(query);
    } else {
      this.results = this.hresults;
    }
  }

  filterItems(searchTerm) {
    return this.results.filter((item) => {
      return (
        item.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.pnom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.code_student.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }

  del(id, i) {
    if (this.iloading) {
      return;
    }
    this.iloading = true;
    this.app
      .delData(`${environment.apiUrl}resultses/${id}`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.iloading = false;
          this.results.splice(i, 1);
          this.hresults = this.results;
        },
        (error) => {
          this.iloading = false;
        }
      );
  }
  exportexcel(): void {
    /* table id is passed over here */
    const element = document.getElementById('zero_configuration_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    this.fileName = this.cfrag.code + '_' + this.ccours.code + '.xlsx';
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = XLSX.utils.sheet_to_json(ws, {
      header: 1,
    }) as XLSX.AOA2SheetOpts;

    return data;
  }

  getOneAC(id) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.acs.length; i++) {
      // tslint:disable-next-line:radix
      if (parseInt(id) === parseInt(this.acs[i].id)) {
        return this.acs[i];
      }
    }
    return null;
  }

  getEtabInfo() {
    this.app.getData(`${environment.apiUrl}etablissements`)
      .pipe(first())
      .subscribe(
        data => {
          this.etab = data._embedded.etablissements[0];
        },
        error => {
        }
      );
  }

  addPromo() {
    if (!this.ac) {
      return;
    }
    const a = this.getOneAC(this.ac);
    const scode = a.date_debut.split('T')[0].split('-')[0] + '-' + a.date_fin.split('T')[0].split('-')[0];
    const data = {
      // tslint:disable-next-line:max-line-length
      code_cycle:  this.ccycle.code,
      code_niveau: this.cniv.code,
      code: this.crniv.name + '-' + scode,
      niveau_rel: `${environment.apiUrl}niveau_rels/${this.crniv.id}`,
      promo_af: `${environment.apiUrl}promo_afs/${this.ac}`,
      moy_total: this.etab.moy_total,
      moy_accept: this.etab.moy_accept,
      moy_reprise: this.etab.moy_reprise,
      moy_exc: this.etab.moy_exc,
      prog_id: this.crniv.prog_id,
      reprise: this.cniv.reprise,
      max_student:50
    };
    const url = `${environment.apiUrl}promotions`;
    this.app.setData(url, data).pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
          this.loading = false;
          this.response.active = true;
          if (data) {
            this.promos.push(data);
            this.response.state = 'success';
            this.response.message = 'promotion crée avec succès.';
          } else {
            this.response.state = 'danger';
            this.response.message = data.message;
          }
        },
        error => {
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.loading = false;
        }
      );

  }

  onFileChangeUser(args) {
    const self = this;
    const file = args.srcElement && args.srcElement.files && args.srcElement.files[0];
    const f = file.name.split('.');
    const ext = f[f.length - 1];
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const data = this.importFromFile(bstr) as any[];

      const header: string[] = Object.getOwnPropertyNames(new User());
      const importedData = data.slice(1, -1);

      this.importResultsUser = importedData.map((arr) => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return obj as User;
      });
    };
    reader.readAsBinaryString(file);
  }


  uploadUser() {
    if (!this.loading) {
      this.loading = true;
      console.log(this.importResultsUser);
      const DATA = {
        results: this.importResultsUser,
      };
      this.app.setData(`${environment.apiUrl}setListUsers/${this.cniv.code}/${this.index}`, DATA)
        .pipe(first())
        .subscribe(
          (data) => {
            this.loading = false;
            this.response3.active = true;
            if (!data.crash) {
              if (data.data.length > 0) {
                this.userRemain = data.data;
              }
              this.response3.state = 'success';
              this.response3.message = data.message;
            } else {
              this.response3.state = 'danger';
              this.response3.message = data.message;
            }
          },
          (error) => {
            this.loading = false;
            this.response3.active = true;
            this.response3.state = 'danger';
            this.response3.message = error;
          }
        );
    }
  }
}
