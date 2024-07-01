import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { RecComponent } from './recruit/rec.component';


@NgModule({
  declarations: [
    ProfileComponent,
    EntrepriseComponent,
    RecComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  exports :[ SharedModule ]
})
export class EntProfileModule { }
