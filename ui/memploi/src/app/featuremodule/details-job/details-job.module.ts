import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsJobRoutingModule } from './details-job-routing.module';
import { DetailsJobComponent } from './details-job.component';


@NgModule({
  declarations: [
    DetailsJobComponent
  ],
  imports: [
    CommonModule,
    DetailsJobRoutingModule
  ]
})
export class DetailsJobModule { }
