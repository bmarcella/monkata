import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Event as RouterEvent,
  NavigationStart,
  Router,
} from '@angular/router';

import { routes } from 'src/app/core/helpers/routes/routes';
import { CommonService } from 'src/app/service/common.service';
import { CrudService } from 'src/app/service/crud.service';
import { DataService } from 'src/app/service/data.service';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { SidebarService } from 'src/app/service/sidebar.service';
import {
  header,
  url,
} from 'src/app/shared/models/header.model';
import { getURL } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header-eight.component.html',
  styleUrls: ['./header-eight.component.scss'],
})
export class HeaderComponent implements OnInit {
  public routes = routes;
  base = '';
  page = '';
  last = '';
  public scrollPosition = 0;

  public nav = false;
  login: boolean
  header: header[] = [];
  user: any;
  constructor(
    private data: DataService,
    private router: Router,
    private common: CommonService,
    private auth: KeycloakService,
    private sidebarService: SidebarService,
    private crud: CrudService
  ) {
    this.header = this.data.header;
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.getroutes(event);
      }
    });
    this.getroutes(this.router);
    this.login = this.auth.isLoggedIn() as boolean;
    this.user = this.auth.profil();
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
  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.scrollPosition = window.scrollY;
    });
  }

  public test() {
    this.crud.get(getURL("users", "auth/test/" + this.user.keycloakId)).then((r) => {
      console.log(r);
    }).catch((e) => console.log(e));
  }
  public logout() {
    this.login = false;
    this.auth.forceLogout();
    this.auth.logout().then((r) => {
      this.router.navigate(['/auth/login']);
      console.log(r);
    }).catch((e) => console.log(e));
  }



}
