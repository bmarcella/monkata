import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared/shared.module';

import { AddJobRoutingModule } from './add-job-routing.module';
import { AddJobComponent } from './add-job.component';

@NgModule({
  declarations: [
    AddJobComponent
  ],
  imports: [
    CommonModule,
    AddJobRoutingModule,
    SharedModule,
  ]
})
export class AddJobgModule { }
