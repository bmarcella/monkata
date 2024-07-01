import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import {
  RECAPTCHA_SETTINGS,
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaFormsModule,
  RecaptchaSettings,
  RecaptchaV3Module,
} from 'ng-recaptcha';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { environment } from 'src/environments/environment.prod';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpRequestInterceptor } from './service/http-request.interceptor';
import { KeycloakService } from './service/keycloak.service';
import { AlertComponent } from './shared/components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    RecaptchaV3Module,
    RecaptchaFormsModule,
  ],
  providers: [KeycloakService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent],
  exports: [
    RecaptchaV3Module,
    RecaptchaFormsModule
  ]
})
export class AppModule { }
