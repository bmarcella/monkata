/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CrudService } from 'src/app/service/crud.service';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { getURL } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home-eight',
  templateUrl: './home-eight.component.html',
  styleUrls: ['./home-eight.component.scss'],

})
export class HomeEightComponent implements OnInit {
  jobs: any = [];

  filter = {
    query : "",
    city: '',
    type_contrat : '',
    categorie: "",
    lieu:'',
    horaire: ''
  }

  constructor( public router: Router, private crud: CrudService, private auth: KeycloakService) {

  }

  public featuredadsOwlOptions: OwlOptions = {
    margin: 24,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      "<i class='fa-solid fa-angle-left'></i>",
      "<i class='fa-solid fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  public testimonialOwlOptions: OwlOptions = {
    margin: 24,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      "<i class='fa-solid fa-angle-left'></i>",
      "<i class='fa-solid fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  public universitiesCompaniesOwlOptions: OwlOptions = {
    loop: true,
    margin: 24,
    nav: false,
    autoplay: true,
    smartSpeed: 2000,

    navText: [
      "<i class='fa-solid fa-angle-left'></i>",
      "<i class='fa-solid fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },

      550: {
        items: 2,
      },
      700: {
        items: 4,
      },
      1000: {
        items: 6,
      },
    },
  };



  direction() {
    this.router.navigate([routes.listinggridsidebar]);
  }

  ngOnInit(): void {
    AOS.init({ disable: 'mobile', duration: 1200, once: true });
    this.getJobs();
  }

  public getJobs() {
    const URL = getURL("memploi","getJobForHomePage");
    this.crud.get(URL).then((r: any) => {
    if(r.objs && r.objs.length>0) {
      const jbs: any = r.objs;
      this.jobs = jbs.map(job  => {
       const ent = r.ents.find(obj => obj.id ==  job.entreprise_id );
       return {ent, job};
      } );
      console.log("HOME :"+this.jobs);
    }
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(msg);
    });
  }

  public getNumberJobs() {
    const URL = getURL("memploi","getJobForHomePage");
    this.crud.get(URL).then((r: any) => {
    if(r.objs && r.objs.length>0) {
      const jbs: any = r.objs;
      this.jobs = jbs.map(job  => {
       const ent = r.ents.find(obj => obj.id ==  job.entreprise_id );
       return {ent, job};
      } );
      console.log(this.jobs);
    }
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(msg);
    });
  }
  user: any;

  addJob(e){
    this.user = this.auth.profil();
    if (this.user) {
       this.router.navigate(['jobs', "add-job"]);
    } else {
      const url =  "/jobs/add-job";
      this.crud.loginWithReturn(url,e);
    }
  }

  createCV(e){
    this.user = this.auth.profil();
    if (this.user) {
       this.router.navigate(['profile', "cv"]);
    } else {
      const url =  "/profile/cv";
      this.crud.loginWithReturn(url,e);
    }
  }



}
