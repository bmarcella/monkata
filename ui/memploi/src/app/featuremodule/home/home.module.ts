import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { HomeEightRoutingModule } from './home-eight-routing.module';
import { HomeEightComponent } from './home-eight.component';


@NgModule({
  declarations: [
    HomeEightComponent,
  ],
  imports: [
    CommonModule,
    HomeEightRoutingModule,
    SharedModule
  ]
})
export class HomeEightModule { }
