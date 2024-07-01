import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddListingRoutingModule } from './add-ent-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AddEntComponent } from './add-ent.component';



@NgModule({
  declarations: [
    AddEntComponent
  ],
  imports: [
    CommonModule,
    AddListingRoutingModule,
    SharedModule
  ]
})
export class AddEntModule { }
