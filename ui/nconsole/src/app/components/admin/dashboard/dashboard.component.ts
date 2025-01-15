import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { getURL } from '../../../../environments/environment.prod';
import { CrudService } from '../../../service/crud.service';
import { DefaultAppService } from '../../../service/default-app.service';
import { KeycloakService } from '../../../service/keycloak.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  aEnt: any;
  stats = [
    { title: 'Bureaux', value: '', icon: 'bi-building' },
    { title: 'Jobs', value: '', icon: 'bi-briefcase' },
    { title: 'Postulants', value: '', icon: 'bi-person-check' },
    { title: 'View', value: '', icon: 'bi-eye' }
  ];

  constructor( public dApp$: DefaultAppService, private crud: CrudService,  private auth: KeycloakService) {
   
 
  } 
   
  ngOnInit(): void {

    this.auth.getLoginEnt().then((t: any) => {
        if (t) {
           this.getCount();
        }
    }).catch((error: any) => {
      console.error('Authentication error:', error?.message || error);
    });

    this.auth.$appChange.subscribe((data: any) => {
        console.log(data);
        this.getCount();
    });

  }

      public getCount() {
        
        //  let URL = getURL("users","entreprise/count");
    
        let URL = getURL("memploi","countEnt");
        this.crud.get(URL).then((r) => {
         this.stats[1].value = r.job;
         this.stats[2].value = r.post;
         this.stats[3].value = r.view;
         console.log("NEW DATA : ",r);
      }).catch((e) => console.log(e));
        
    
        URL = getURL("users","entreprise/get");
        this.crud.get(URL).then((r: any) => {
          this.aEnt = r;
          console.log(r);
        }).catch((e) => {
          const msg = e.error.error.message;
          console.log(e, msg);
        });
      }


}