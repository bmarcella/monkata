import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { JobsmoduleComponent } from './jobsmodule.component';
import { KeycloakService } from '../service/keycloak.service';



@NgModule({
  declarations: [JobsmoduleComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule,
  ],
  providers: [KeycloakService],
})
export class JobsModule { }
