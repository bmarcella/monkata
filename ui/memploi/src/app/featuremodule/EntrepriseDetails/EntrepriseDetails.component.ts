import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { getURL } from 'src/environments/environment.prod';
import { DeployType } from '../../../../../../common/deploy';

@Component({
  selector: 'app-entreprise-details',
  templateUrl: './EntrepriseDetails.component.html',
  styleUrls: ['./EntrepriseDetails.component.css']
})
export class EntrepriseDetailsComponent implements OnInit {
  ent: any = null;
  jobs: any[] = [];
  id: any;
  logo: string ;
  page = 1;
  paginations
  itemsPerPage = DeployType.NPage;
  get totalPages(): number {
    return Math.ceil(this.paginations.numberJobs / this.itemsPerPage);
  }
  constructor(private auth: KeycloakService, public router: Router,private crud: CrudService, public act: ActivatedRoute,) {}
  
  ngOnInit(): void {
    this.act.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getEnt(this.id);
    });
  }

  public getEnt(id: number) {
    const URL = getURL("memploi","cv/entreprise/"+id);
    this.crud.get(URL).then((r: any) => {
      if (r==undefined || r == null || r == ""){
         this.router.navigate(['/']);
      }else{
        this.ent = r;
        this.logo  = this.auth.getLogo(this.ent.id);
        console.log("DATA: ",r);
        this.getJobs(this.page);
      }
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }

  public getJobs(page: number, e?:any) {
    const URL = getURL("memploi","getJobByIdEnt/"+this.ent.id+"/"+page);
    this.crud.get(URL, e).then((r: any) => {
     if (r.jobs.length!=0) {
      const jbs= r.jobs;
      this.jobs = jbs.map(job  => {
        const ent = this.ent;
        return {ent, job};
       } );
      this.paginations = r.pagination;
      console.log("JOBS: ", this.jobs);
      console.log("PAGES: ",  this.paginations);
     }
     
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(e, msg);
    });
  }

  onPageChange(data): void {
    console.log('Page changed to:', data.page);
    this.getJobs(data.page, data.e);
    // Handle page change logic here
  }



}
