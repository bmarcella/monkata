import { NgClass, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceApp } from '../../../../../../../common/index/Frontend';
import { gWURL } from '../../../../environments/environment.prod';
import { CrudService } from '../../../service/crud.service';
import { DefaultAppService } from '../../../service/default-app.service';
import { EventBusService } from '../../../service/event-bus.service';
import { KeycloakService } from '../../../service/keycloak.service';

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
  imports: [NgFor, NgClass],
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent  implements OnInit {
  apps: App[] = [];
  app: any;
   constructor( private router: Router, public dApp$: DefaultAppService, private crud: CrudService,  private auth: KeycloakService, private event: EventBusService, private cdRef: ChangeDetectorRef ) {
        this.app = this.dApp$.getApp();
        console.log(this.app);
        this.getApp();
  }
  ngOnInit(): void {
    this.getApp();
  }

   public getApp() {
        this.crud.get(gWURL("applications")).then((r) => {
          console.log(r);
          let i = 0;
    
          Object.entries(r).forEach(([key, value]) => {
            if ((value as ServiceApp).show){
             const v = value as ServiceApp;
              this.apps.push(
                {
                  id: key,
                  name: v.name,
                  description: v.description || "",
                  icon: v.img || "",
                  status: v.name == this.app ? 'active' : 'inactive',
                }
              );
            }
          });
        }).catch((e) => console.log(e));
      }

  setActiveApp(appId: any) {
    this.app = appId;
    this.dApp$.setApp(appId);
    this.cdRef.detectChanges();
  }
}