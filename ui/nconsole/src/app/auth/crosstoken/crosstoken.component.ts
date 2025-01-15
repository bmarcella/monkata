/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { DefaultAppService } from '../../service/default-app.service';
import { KeycloakService } from '../../service/keycloak.service';

@Component({
  selector: 'app-crosstoken',
  templateUrl: './crosstoken.component.html',
  styleUrls: ['./crosstoken.component.scss'],
  providers: [KeycloakService],
})
export class CrosstokenComponent implements OnInit {
  token: any;
  constructor(public router: Router, private kc: KeycloakService, public act: ActivatedRoute, public dApp: DefaultAppService) { }

  ngOnInit(): void {
    this.act.paramMap.subscribe(params => {
      this.token = params.get('token');
      this.kc.getCT(this.token).then((r: any) => {
        console.log(r);
        this.dApp.setApp(r.cross_token.defaultApp)
        const kc = JSON.parse(r.cross_token.kCToken);
        this.kc.refreshNewToken(kc);
        this.kc.setLogin();
        setTimeout(() => {
          if (!r.cross_token.returnUrl)
            this.router.navigate(['/monkata/dashboard']);
          else
            this.router.navigate([r.cross_token.returnUrl]);
        }, 2000);
      }).catch((e) => {
        console.log(e);
        this.kc.forceLogout();
        this.router.navigate(['/auth/login']);
      });

    });
  }




}
