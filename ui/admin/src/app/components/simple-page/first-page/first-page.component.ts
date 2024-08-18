import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { CrudService } from 'src/app/service/crud.service';
import { getURL } from 'src/environments/environment.prod';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {

  stat = {
    jobs : 0,
    ents: 0,
    users:0,
    post:0
  }
  constructor(  private crud: CrudService, private aUI:  AlertService) {  }


  ngOnInit(): void {
    this.getStats();
    this.getJobStat();
  }

  public getStats() {
    const URL = getURL("users","auth/getStats");
    this.crud.get(URL).then((r: any) => {
      this.stat.ents  =  r.total_entreprise;
      this.stat.users  = r.total_user;
      console.log(r);
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(msg);
    });
  }

  public getJobStat() {
    const URL = getURL("memploi","getStats");
    this.crud.get(URL).then((r: any) => {
      this.stat.jobs  = r.total_jobs;
      this.stat.post  = r.total_postulant;
      console.log(r);
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(msg);
    });
  }


}
