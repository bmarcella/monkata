import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { EditUserCvComponent } from './edit-user-cv.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    EditUserCvComponent
  ],
  imports: [
    CommonModule,
    EditUserRoutingModule,
    SharedModule
  ]
})
export class EditUserCvModule { }
