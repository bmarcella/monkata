import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';



import { SharedModule } from '../../../shared/shared.module';
import { AddJobComponent } from './add/addJob.component';
import { ObjComponent } from './component';
import { DetailsComponent } from './details/details.component';
import { EditJobComponent } from './edit/edit.component';
import { RoutingModule } from './routing.module';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    ObjComponent,
    ShowComponent,
    DetailsComponent,
    AddJobComponent,
    EditJobComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    NgxEditorModule,
    SharedModule
  ]
})
export class JobsModule { }
