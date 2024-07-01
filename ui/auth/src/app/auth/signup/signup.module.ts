import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  RECAPTCHA_SETTINGS,
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaFormsModule,
  RecaptchaSettings,
  RecaptchaV3Module,
} from 'ng-recaptcha';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { environment } from 'src/environments/environment.prod';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RecaptchaV3Module,
    RecaptchaFormsModule,
    SignupRoutingModule,
  ],
  providers: [
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
  exports : [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SignupModule { }
