import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { getURL } from '../../../../environments/environment.prod';
import { CrudService } from '../../../service/crud.service';
import { DefaultAppService } from '../../../service/default-app.service';
import { AppEvent } from '../../../service/Event';
import { EventBusService } from '../../../service/event-bus.service';
import { EventData } from '../../../service/event.class';
import { KeycloakService } from '../../../service/keycloak.service';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent  implements OnInit {

  companies: any[] = []; 
  cEnt: any ;
  constructor(private crud: CrudService, private auth: KeycloakService, public dApp$: DefaultAppService, private event: EventBusService ) {
  
  }

  ngOnInit() {
   this.init();
   this.event.$on(AppEvent.CHANGE_ENT, (data: any) => {
     this.init(data.id);
   });
  }

  init(id?: number){
    if(!id){
      this.auth.getLoginEnt().then((data: any)=>{
         this.cEnt = data.appEnt.entId;
         this.getEnts();
      });
    } else {
      this.cEnt = id;
      this.getEnts();
    }
  }

  public getEnts() {
    const URL = getURL("memploi", "cv/entreprises");
    this.crud.get(URL).then((r: any[]) => {
      
      if (this.cEnt){
          const index = r.findIndex((item: any)=> item.id == this.cEnt);
          if (index != -1){
            const data  = r[index];
            r.splice(index, 1);
            r.unshift(data);
          }
      }

      this.companies = r;
      console.log(r);
    }).catch((e) => {
      console.log(e);
    });
  }


  getLogo(id: number) {
    return this.auth.getLogo(id);
  }

  setActiveCompany(company: any) {
    this.event.$emit(new EventData(AppEvent.CHANGE_ENT, company));
  }
}