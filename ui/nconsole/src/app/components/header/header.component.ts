import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from '../../service/keycloak.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user: any;
  constructor(
    private router: Router,
    private auth: KeycloakService,

  ) {

    this.user = this.auth.profil();
  }

  public logout() {
    this.user = undefined;
    this.auth.forceLogout();
    this.router.navigate(['/']);
  }
}