import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { DetailsJobRoutingModule } from './details-job-routing.module';
import { DetailsJobComponent } from './details-job.component';


@NgModule({
  declarations: [
    DetailsJobComponent
  ],
  imports: [
    CommonModule,
    DetailsJobRoutingModule,
    SharedModule
  ]
})
export class DetailsJobModule { }
