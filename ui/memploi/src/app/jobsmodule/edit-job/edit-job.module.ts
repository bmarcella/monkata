import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { EditJobRoutingModule } from './edit-job-routing.module';
import { EditJobComponent } from './edit-job.component';



@NgModule({
  declarations: [
    EditJobComponent
  ],
  imports: [
    CommonModule,
    EditJobRoutingModule,
    SharedModule
  ]
})
export class EditJobModule { }
