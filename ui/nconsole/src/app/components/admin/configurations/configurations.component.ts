import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { getURL } from '../../../../environments/environment.prod';
import { ConfigSection } from '../../../interfaces/role.interface';
import { CrudService } from '../../../service/crud.service';
import { DefaultAppService } from '../../../service/default-app.service';
import { EventBusService } from '../../../service/event-bus.service';
import { KeycloakService } from '../../../service/keycloak.service';

@Component({
  selector: 'app-configurations',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent {
  activeSection: string = 'users';
  page = 1;
  configSections: ConfigSection[] = [
    {
      id: 'users',
      name: 'User',
      icon: 'bi-user',
      description: 'Manage user '
    },
    {
      id: 'roles',
      name: 'Roles',
      icon: 'bi-shield-lock',
      description: 'Manage user roles and permissions'
    },
    {
      id: 'security',
      name: 'Security Settings',
      icon: 'bi-shield-check',
      description: 'Configure security and authentication'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: 'bi-bell',
      description: 'Email and notification preferences'
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: 'bi-plug',
      description: 'Third-party service connections'
    }
  ];

  roles: any [] = [];
  app: any;
   constructor( public dApp$: DefaultAppService, private crud: CrudService,  private auth: KeycloakService, private event: EventBusService, private cdRef: ChangeDetectorRef ) {
        this.app = this.dApp$.getApp();
        this.getData();
  }

  setActiveSection(sectionId: string) {
    this.activeSection = sectionId;
    this.getData();
  }

  getData() {
    switch (this.activeSection) {
      case "users":
        this.getUser();
      break; 
      case "roles":
        this.getRole();
      break; 
    }
  }

  getRole(){
      const URL = getURL( "users","role/getRoles");
          this.crud.get(URL).then((r: any) => {
             this.roles = r;
            }).catch((e) => {
            console.log(e);
          });
  }

  getUser(){
    const URL = getURL( "users","role/getUserRole/"+this.page);
        this.crud.get(URL).then((r: any) => {
           console.log(r);
          }).catch((e) => {
          console.log(e);
        });
}



}