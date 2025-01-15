import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';

@Component({
  selector: "app-prog-details",
  templateUrl: "./prog-details.component.html",
  styleUrls: ["./prog-details.component.css"],
})
export class ProgDetailsComponent implements OnInit {
  msg: any;
  constructor(private route: ActivatedRoute, private app: AppService) {}
  progs: any;
  cours: any;
  pcours = [];
  loading: any;
  ID: any;
  hcours: any;
  hpcours: any;
  page = 0;
  mat: any = { name: "", desc: "" };
  response = { state: "", message: "", active: false };
  fours = [];
  hfours = [];
  pfours = [];
  hpfours = [];
  qt = [];
  hides = false;

  all;
  listToDel = [];
  el = [];

  ngOnInit() {
    this.ID = this.route.snapshot.params.id;
    this.getProgs();
    this.getFours();
  }

  setPage(p) {
    this.page = p;
  }

  getProgs() {
    const url = `${environment.apiUrl}programmes/${this.ID}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.progs = data;
          this.getPCours(data._links.course);
          this.getPFours(data._links.progfourniture);
          this.getCours(data.niveau);
        },
        (error) => {}
      );
  }

  getFours() {
    const url = `${environment.apiUrl}fournitures?size=1000`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.fours = data._embedded.fournitures;
          this.hfours = this.fours;
        },
        (error) => {}
      );
  }

  getCours(niv) {
    const url = `${environment.apiUrl}getPCours/${niv}/${this.ID}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cours = data.data;
          this.hcours = this.cours;
        },
        (error) => {}
      );
  }

  getPCours(url) {
    this.app
      .getData(url.href)
      .pipe(first())
      .subscribe(
        (data) => {
          this.pcours = data._embedded.courses;
          this.hpcours = this.pcours;
          console.log(this.pcours);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getPFours(url) {
    this.app
      .getData(url.href)
      .pipe(first())
      .subscribe(
        (data) => {
          this.pfours = data._embedded.progFournitures;
          this.hpfours = this.pfours;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addCours(item, i) {
    if (this.loading) {
      return;
    }
    this.msg =undefined;
    if(this.pcours.length>=this.progs.max_cours){
     this.msg="MAX COURS ("+this.progs.max_cours+")";
     return;
    }
    this.loading = true;
    const url = `${environment.apiUrl}addCoursToProg/${this.ID}/${item.id}`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          if (data != null) {
            this.pcours.push(data);
            this.cours.splice(i, 1);
            this.hcours = this.cours;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  addFours(item, i, qt) {
    if (this.loading) {
      return;
    }
     this.msg =undefined;
    if(this.pfours.length>=this.progs.max_four){
     this.msg="MAX  FOURNITURE ("+this.progs.max_four+")";
     return;
    }
    this.loading = true;
    const url = `${environment.apiUrl}addFoursToProg/${this.ID}/${item.id}/${qt}`;
    console.log(url);
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          console.log(data);
          if (!data.crash) {
            this.pfours.push(data.data);
            this.fours.splice(i, 1);
            this.hfours = this.fours;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  delCours(item, i) {
    const url = `${environment.apiUrl}programmes/${this.ID}/course/${item.id}`;
    this.app
      .delData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.cours.push(item);
          this.pcours.splice(i, 1);
          this.hcours = this.cours;
          this.hpcours = this.pcours;
        },
        (error) => {}
      );
  }

  delFours(item, i) {
    const url = `${environment.apiUrl}progFournitures/${item.id}`;
    this.app
      .delData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.pfours.splice(i, 1);
          this.hpfours = this.pfours;
        },
        (error) => {}
      );
  }
query;
pquery;

  onKey(e) {
    const query = e;
    if (query != null && query != "" && query !== undefined) {
      this.cours = this.filterItems(query);
    } else {
      this.cours = this.hcours;
    }
  }

  filterItems(searchTerm) {
    return this.cours.filter((item) => {
      return item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  onKeyUp(e) {
    const query = e.target.value;
    if (query != null && query != "" && query !== undefined) {
      this.pcours = this.filterItemsUp(query);
    } else {
      this.pcours = this.hpcours;
    }
  }

  filterItemsUp(searchTerm) {
    return this.pcours.filter((item) => {
      return item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  editProg() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    const $POST = {
      name: this.progs.name,
      description: this.progs.description,
      pos: this.progs.pos,
      max_cours: this.progs.max_cours,
      max_four: this.progs.max_four
    };
    const url = `${environment.apiUrl}programmes/${this.ID}`;
    this.app
      .editData(url, $POST)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.response.active = true;
          if (data != null) {
            this.response.state = "success";
            this.response.message = "Modification affectuée avec succes";
          } else {
            this.response.state = "danger";
            this.response.message = "Erreur serveur";
          }
        },
        (error) => {
          this.response.active = true;
          this.response.state = "danger";
          this.response.message = error;
          this.loading = false;
        }
      );
  }

  fOnKey(e) {
    const query = e.target.value;
    if (query != null && query == "" && query !== undefined) {
      this.fours = this.fFilterItems(query);
    } else {
      this.fours = this.hfours;
    }
  }

  fFilterItems(searchTerm) {
    return this.fours.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  pfOnKey(e) {
    const query = e.target.value;
    if (query != null && query == "" && query !== undefined) {
      this.pfours = this.pfFilterItems(query);
    } else {
      this.pfours = this.hpfours;
    }
  }

  pfFilterItems(searchTerm) {
    return this.pfours.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  changetatus(id, e, i) {
    if (e.target.checked) {
      this.listToDel.push(parseInt(id));
    } else {
      this.removeOne(id);
    }
    console.log(this.listToDel);
  }

  tchange(e) {
    if (e.target.checked) {
      this.selectAll();
    } else {
      this.removeAll();
    }
  }

  removeOne(id) {
   for (let i = 0; i < this.listToDel.length; i++) {
      if (this.listToDel[i] == id) {
        this.listToDel.splice(i, 1);
         break;
      }
    }
  }

  selectAll() {
    console.log(this.pcours.length);
    this.listToDel = [];
    for (let i = 0; i < this.pcours.length; i++) {
          this.listToDel.push(parseInt(this.pcours[i].id));
          this.el[i] = true;
    }
  }

  removeAll() {
    this.listToDel = [];
    this.pcours.forEach((e, i) => {});
    for (let i = 0; i < this.pcours.length; i++) {
      this.el[i] = false;
    }
  }

  delAll() {
     for (let i = 0; i < this.listToDel.length; i++) {
      this.delCoursAll(this.listToDel[i]);
    }
  }

  removeCours(id) {
   for (let i = 0; i < this.pcours.length; i++) {
      if (this.pcours[i].id == id) {
          this.pcours.splice(i, 1);
          break;
      }
    };
    this.hpcours = this.pcours;
  }

  delCoursAll(id) {
    const url = `${environment.apiUrl}programmes/${this.ID}/course/${id}`;
    this.app
      .delData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.removeCours(id);
          console.log("del:"+id);
        },
        (error) => {}
      );
  }
}
