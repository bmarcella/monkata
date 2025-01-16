import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecRoutingModule } from './rec-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RecRoutingModule,
    SharedModule
  ]
})
export class RecModule { }
