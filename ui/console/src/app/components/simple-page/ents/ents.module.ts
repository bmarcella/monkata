import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { DetailsEntComponent } from './details-ent/details-ent.component';
import { EntsRoutingModule } from './ents-routing.module';
import { EntsComponent } from './ents.component';
import { ShowEntComponent } from './show-ent/show-ent.component';

@NgModule({
  declarations: [
   EntsComponent,
   ShowEntComponent,
   DetailsEntComponent
  ],
  imports: [
    CommonModule,
    EntsRoutingModule,
    SharedModule
  ]
})
export class EntsModule { }
