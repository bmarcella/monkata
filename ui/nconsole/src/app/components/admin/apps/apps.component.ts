import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceApp } from '../../../../../../../common/index/Frontend';
import { gWURL } from '../../../../environments/environment.prod';
import { CrudService } from '../../../service/crud.service';
import { DefaultAppService } from '../../../service/default-app.service';
import { EventBusService } from '../../../service/event-bus.service';
import { KeycloakService } from '../../../service/keycloak.service';
import { EventData } from '../../../service/event.class';
import { AppEvent } from '../../../service/Event';

interface App {
  id: string;
  name: string;
  description: string;
  status?: 'active' | 'inactive';
  icon: string;
  lastUpdated?: string;
}

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [NgFor,NgIf, NgClass],
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent  implements OnInit {
  apps: App[] = [];
  app: any;
  constructor( private router: Router, public dApp$: DefaultAppService, private crud: CrudService,  private auth: KeycloakService, private event: EventBusService, private cdRef: ChangeDetectorRef ) {
  }
  ngOnInit(): void {
  this.event.$on(AppEvent.CHANGE_APP_COMPLETE, (data: any) => {
          this.apps = [];
          this.init(); 
          this.getApp();
  });
  this.init();
  this.getApp();
  }

  init(){
    this.auth.getLoginEnt().then((data: any)=>{
          console.log(data);
          if(data.appEnt)
          this.app = data.appEnt;
    });
  }

   public getApp() {
        this.crud.get(gWURL("applications")).then((r) => {
          let i = 0;
          Object.entries(r).forEach(([key, value]) => {
            if ((value as ServiceApp).show){
             const v = value as ServiceApp;
                this.apps.push(
                {
                  id: key,
                  name: (v.name) ? v.name.charAt(0).toUpperCase() + v.name.slice(1) : '',
                  description: v.description || "",
                  icon: v.img || "",
                  status: (this.app.appName===v.name) ? 'active' : 'inactive',
                }
                );
            }
          });
        }).catch((e) => console.log(e));
  }

  setActiveApp(app: any) {
    this.cdRef.detectChanges();
    this.event.$emit(new EventData(AppEvent.CHANGE_APP, app));
  }
}