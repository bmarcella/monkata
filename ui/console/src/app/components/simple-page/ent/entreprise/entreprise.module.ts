import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepriseRoutingModule } from './entreprise-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EntrepriseRoutingModule,
    SharedModule
  ]
})
export class EntrepriseModule { }
