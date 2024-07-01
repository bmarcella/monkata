import { Component, OnInit } from '@angular/core';
import { RouterEvent, NavigationStart, Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { DataService } from 'src/app/service/data.service';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { SidebarService } from 'src/app/service/sidebar.service';
import { header, url } from 'src/app/shared/models/header.model';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit{

  public routes = routes;
  base = '';
  page = '';
  last = '';

  public nav: boolean;
  header: header[] = [];

  constructor(
    private data: DataService,
    private router: Router,
    private sidebarService: SidebarService,
    private auth : KeycloakService
  ) {
    this.header = this.data.headerAdmin;
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.getroutes(event);
      }
    });
    this.nav = this.auth.isLoggedIn() as boolean;
    console.log(this.nav);
    this.getroutes(this.router);
  }
  ngOnInit(): void {
    this.toggleSidebar();
  }

  private getroutes(route: url): void {
    const splitVal = route.url.split('/');
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];
    if (this.base == 'userpages') {
      this.nav = false;
    } else {
      this.nav = true;
    }
  }

  public toggleSidebar(): void {
    this.sidebarService.openSidebar();
  }
  public hideSidebar(): void {
    this.sidebarService.closeSidebar();
  }


}
