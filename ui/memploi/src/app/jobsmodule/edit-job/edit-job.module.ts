import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { EditJobComponent } from './edit-job.component';
import { EditJobRoutingModule } from './edit-job-routing.module';



@NgModule({
  declarations: [
   EditJobComponent
  ],
  imports: [
    CommonModule,
    EditJobRoutingModule,
    SharedModule,

  ]
})
export class EditJobModule { }
