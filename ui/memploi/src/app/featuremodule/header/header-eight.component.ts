import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from 'src/app/service/crud.service';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { SidebarService } from 'src/app/service/sidebar.service';
import { header } from 'src/app/shared/models/header.model';
import { getURL } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header-eight.component.html',
  styleUrls: ['./header-eight.component.scss'],
})
export class HeaderComponent implements OnInit {
  base = '';
  page = '';
  last = '';
  public scrollPosition = 0;

  public nav = false;
  login = false;
  header: header[] = [];
  user: any;
  avatar = '';
  path: any ;
  ent: any;
  constructor(
    private router: Router,
    private auth: KeycloakService,
    private sidebarService: SidebarService,
    private crud: CrudService,
  ) {
    this.user = this.auth.profil();
    console.log(this.user);
    if(this.user) {
      this.login = true;
      this.avatar = this.auth.getAvatar(this.user.id);
      this.getEntreprises();
    }
  }

  public getEntreprises() {
    const URL = getURL("memploi","countEntAndJob");
    this.crud.get(URL).then((r) => {
    this.ent = r.count;
    console.log(r);
    }).catch((e) => console.log(e));
  }

  public toggleSidebar(): void {
    this.sidebarService.openSidebar();
  }
  public hideSidebar(): void {
    this.sidebarService.closeSidebar();
  }

  ngOnInit(): void {
    this.auth.isLoggedIn();
    this.path = this.router.url;
    window.addEventListener('scroll', () => {
      this.scrollPosition = window.scrollY;
    });
  }

  public logout() {
    this.login = false;
    this.user = undefined;
    this.auth.forceLogout();
    this.router.navigate(['/']);
  }

  public loginNow() {
   this.crud.login();
  }


}
