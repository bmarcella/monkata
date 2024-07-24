import { formatNumber } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { Lightbox } from 'ngx-lightbox';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AlertService } from 'src/app/service/alert.service';
import { getURL } from 'src/environments/environment.prod';

import { CrudService } from '../../service/crud.service';
import { KeycloakService } from '../../service/keycloak.service';

@Component({
  selector: 'app-details-job',
  templateUrl: './details-job.component.html',
  styleUrls: ['./details-job.component.scss']
})
export class DetailsJobComponent implements OnInit {

  public routes = routes;
  public albumsOne: any = [];
  public albumsTwo: any = [];
  job: any;
  ent: any;
  id: any | undefined;
  logo: any;
  user: any;
  constructor(private aUI:  AlertService, private auth: KeycloakService, private _lightbox: Lightbox, public router: Router, public act: ActivatedRoute, private crud: CrudService ) {

  }


  ngOnInit(): void {
    this.act.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getJob(this.id);
    });
  }

  public getJob(id: any) {
    const URL = getURL("memploi","getJobById/"+id);
    this.crud.get(URL).then((r) => {
     console.log(r);
     this.job = r.job;
      //
      // this.job.description = toHTML(this.job.description);
      //
     this.ent = r.entreprise;
     this.logo = this.auth.getLogo(this.ent.id);
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(msg);
    });
  }
  open(index: number, albumArray: Array<any>): void {
    this._lightbox.open(albumArray, index);
  }
  openAll(albumArray: Array<any>): void {
    this._lightbox.open(albumArray);
  }

  close(): void {
    this._lightbox.close();
  }

  direction() {
    //
  }

  currency (num : any ){
    return  formatNumber(Number(num), 'en-US', '1.0-0')
  }
  post(e){
    this.user = this.auth.profil();
    if (this.user) {
       this.router.navigate(['job', "apply", this.job.id ]);
    } else {
      const url =  "/job/apply/"+this.job.id;
      this.crud.loginWithReturn(url,e);
    }
  }

  report(e) {
    this.user = this.auth.profil();
    if (this.user) {
      const URL = getURL("memploi","report/"+this.job.id);
      this.crud.get(URL,e).then((r) => {
        this.aUI.show({ active : true, message: "Vous avez signalé ce poste avec succès" , type: "success", pos: 'top-right' });
        // console.log(r);
      }).catch((e) => {
        const msg = e.error.message;
        this.aUI.show({ active : true, message: msg , type: "danger", pos: 'top-right' });
        console.log(e);
      });
    } else {
      const url =  "/job/apply/"+this.job.id;
      this.crud.loginWithReturn(url,e);
    }
  }

}
