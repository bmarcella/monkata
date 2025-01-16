import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { CrudService } from 'src/app/service/crud.service';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { SidebarService } from 'src/app/service/sidebar.service';
import { header } from 'src/app/shared/models/header.model';
import { getRURL, getURL } from 'src/environments/environment.prod';

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
  cv: any;
  avatar = '';
  path: any ;
  ent: any;
  isMobile: any;
  deviceInfo: any;
  constructor(
    private router: Router,
    private auth: KeycloakService,
    private sidebarService: SidebarService,
    private crud: CrudService,
    private deviceService: DeviceDetectorService
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.user = this.auth.profil();
    this.cv = this.auth.cv();
    if(this.user) {
      this.login = true;
      if(this.cv)
         this.avatar = this.auth.getAvatar(this.cv.id);
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

  crossToken(){
    const URL = getURL("users","cross-token/directLoginCT/memploi");
    this.crud.get(URL).then((r) => {
    const URL = getRURL(r.cross_token,r.app);
    console.log(r, URL);
    //window.location.href = URL;
    window.open(URL, '_blank');
    }).catch((e) => console.log(e));
  }


}
