import { formatNumber } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { toHTML } from 'ngx-editor';
import { Type_Categorie } from 'src/app/admin/categorie/categorie.component';
import { CategorieService } from 'src/app/service/categorie.service';
import { CrudService } from 'src/app/service/crud.service';
import { Env_Work, Horaire_de_travail, Periode_salaire, Type_contrat } from 'src/app/shared/models/Jobs';
import { getURL } from 'src/environments/environment.prod';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs: any =[];
  job: any ;
  ent : any;
  deviceInfo;
  paginations;
  cats: any = [];
  filter : any = {
    query: '',
    categorie: '',
    location: '',
    type_contrat: '',
    env: '',
    horaire: '',
  }
  contratOptions = Object.values(Type_contrat);
  envOptions = Object.values(Env_Work);
  horaireOptions = Object.values(Horaire_de_travail);
  salaireOptions = Object.values(Periode_salaire);
  isMobile;
  constructor( private el: ElementRef, public router: Router, private crud: CrudService, private cat: CategorieService, private deviceService: DeviceDetectorService) {

  }
  ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.getJobs();
    this.getCats();
  }

  currency (num : any ) {
    return  formatNumber(Number(num), 'en-US', '1.0-0')
  }

  public getJobs() {
    const URL = getURL("memploi","getJobs");
    this.crud.get(URL).then((r: any) => {

    if(r.objs && r.objs.length>0) {
      const jbs: any = r.objs;
       this.jobs = jbs.map(job  => {
       const ent = r.ents.find(obj => obj.id ==  job.entreprise_id );
        return {ent, job};
      } );

      if(this.jobs.length>0 && !this.isMobile ){
        this.job = this.jobs[0].job;
        //
        // this.job.description = toHTML(this.job.description);
        //
        this.ent = this.jobs[0].ent;
      }
      this.paginations = r.pagination;
    }

    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(msg);
    });
  }

  show(data: any) {
    this.job = data.job;
     //
     this.job.description = toHTML(this.job.description);
     //
    this.ent = data.ent;
    if (this.isMobile)
      this.scrollToTop();
  }

  close () {
    this.scrollToElement(this.job.id)
    this.job = undefined;
    this.ent = undefined;
  }
  scrollToElement(id): void {
    const element = this.el.nativeElement.querySelector('#job-'+id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  changePage(p, e) {
    const URL = getURL("memploi","getJobsFilter/"+Number(p));
    const query = (this.step==1) ? this.filter : {};
    this.crud.post(URL,query, e).then((r: any) => {
    if(r.objs && r.objs.length>0) {
      const jbs: any = r.objs;
       this.jobs = jbs.map(job  => {
       const ent = r.ents.find(obj => obj.id ==  job.entreprise_id );
       return {ent, job};
      } );
      if(this.jobs.length>0 && !this.isMobile ) {
        this.job = this.jobs[0].job;
         //
         // this.job.description = toHTML(this.job.description);
         //
        this.ent = this.jobs[0].ent;
      } else {
        this.job = undefined;
        this.ent = undefined;
      }
      this.scrollToTop();
      this.paginations.currentPage = p;
      console.log(r);
    }

    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(msg);
    });
  }

  public scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  public getCats() {
    this.cat.getCatforEnt(Type_Categorie[0]).then((r) => {
    this.cats = r;
    }).catch((e) => console.log(e));
  }
  step = 0;
  search(e) {
    const URL = getURL("memploi","getJobsFilterSearch");
    this.crud.post(URL, this.filter).then((r: any) => {
    if(r.objs && r.objs.length>0) {
      const jbs: any = r.objs;
       this.jobs = jbs.map(job  => {
       const ent = r.ents.find(obj => obj.id ==  job.entreprise_id );
       return {ent, job};
      } );

      if(this.jobs.length>0 && !this.isMobile) {
        this.job = this.jobs[0].job;
         //
         // this.job.description = toHTML(this.job.description);
         //
        this.ent = this.jobs[0].ent;
      } else {
        this.job = undefined;
        this.ent = undefined;
      }

      this.scrollToTop();
      this.paginations = r.pagination;
    }
    this.step = 1;
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(msg);
    });
  }

  changeFilter(e) {
    const URL = getURL("memploi","getJobsFilterSearch");
    this.crud.post(URL, this.filter).then((r: any) => {
    if(r.objs && r.objs.length>0) {
      const jbs: any = r.objs;
       this.jobs = jbs.map(job  => {
       const ent = r.ents.find(obj => obj.id ==  job.entreprise_id );
       return {ent, job};
      } );

      if(this.jobs.length>0 && !this.isMobile){
        this.job = this.jobs[0].job;
         //
         // this.job.description = toHTML(this.job.description);
         //
        this.ent = this.jobs[0].ent;
      } else {
        this.job = undefined;
        this.ent = undefined;
      }

      this.scrollToTop();
      this.paginations = r.pagination;
    } else {
      this.jobs = [];
    }
    this.step = 1;
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(msg);
    });
  }


}
