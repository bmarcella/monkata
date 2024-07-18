/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { KeycloakService } from 'src/app/service/keycloak.service';
import { getRURL } from 'src/environments/environment.prod';


@Component({
  selector: 'app-crosstoken',
  templateUrl: './crosstoken.component.html',
  styleUrls: ['./crosstoken.component.scss'],
  providers:[KeycloakService]
})
export class CrosstokenComponent implements  OnDestroy  {
  token: any;
  isLog: any;
  ctoken: any;
  step = 0;
  navigationSubscription;
  user: any;
  login: any;
  avatar: any;
  $timer: any;
  $delay = 10;
  name: any;
  constructor(public router: Router, private kc: KeycloakService, public act: ActivatedRoute ) {
    this.isLog = kc.isLoggedIn();
    console.log(kc.isLoggedIn());
    this.user = this.kc.profil();
    if(this.user) this.avatar = this.kc.getAvatar(this.user.id);
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getData();
      }
    });
   }

setTimer(){

  this.$timer = setInterval(()=> {
   this.$delay--;
   if (this.$delay==0) {
     this.getRefreshToken();
   }
  }, 1000)
}

clearTimer(){
  clearInterval(this.$timer);
}

  getData(){
    this.act.paramMap.subscribe(params => {
      this.token = params.get('token');
      this.kc.getCT(this.token).then((r) => {
        this.ctoken = r

        if(this.isLog) {
          this.step = 1;
          this.$delay = 10;
          this.name = this.ctoken.cross_token.appName.toString();
          this.logout();
        } else {
          this.saveCrossToken();
        }
      }).catch((e) => {
        console.log("GET TOKEN :",e);
        this.router.navigate(['/']);
      });

    });
  }

  logout() {
    this.kc.forceLogout();
    this.saveCrossToken();
  }

  getRefreshToken(){
    this.kc.getRefreshToken().then((r) => {
      this.kc.refreshNewToken(r);
      this.setCToken(r);
    }).catch((e) => {
      console.log("GET REFRESH TOKEN :",e);
       if(e.status==403){
          this.kc.forceLogout();
          this.saveCrossToken();
       }
    });
  }

  setCToken(r: any){
    this.kc.setCToken(this.ctoken.cross_token,r).then((r: any) => {
      const URL = getRURL(r.ck, r.app);
      window.location.href = URL;
     }).catch((e) => {
      console.log("GET FINAL TOKEN :",e);
       if(e.status==403){
          this.kc.forceLogout();
          this.saveCrossToken();
       }
    });
  }

  saveCrossToken(){
   this.clearTimer();
   this.kc.saveCToken(this.ctoken);
   this.router.navigate(['/auth/login']);
  }

  ngOnDestroy() {
    if(this.isLog) this.clearTimer();

    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
