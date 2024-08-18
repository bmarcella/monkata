import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { EntsRoutingModule } from './ents/ents-routing.module';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { SimplePageRoutingModule } from './simple-page-routing.module';

@NgModule({
  declarations: [FirstPageComponent, SecondPageComponent],
  imports: [CommonModule, SimplePageRoutingModule, EntsRoutingModule, SharedModule],
  exports: [SharedModule]
})
export class SimplePageModule {}
