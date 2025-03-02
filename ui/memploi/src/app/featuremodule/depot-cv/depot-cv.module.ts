import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepotCvComponent } from './depot-cv.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { DepotCvRoutingModule } from './depot-cv-routing.module';


@NgModule({
  declarations: [
    DepotCvComponent
  ],
  imports: [
    CommonModule,
    DepotCvRoutingModule,
    SharedModule
  ]
})
export class DepotCvModule { }
