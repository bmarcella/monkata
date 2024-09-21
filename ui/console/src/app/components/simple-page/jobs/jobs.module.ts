import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';



import { SharedModule } from '../../../shared/shared.module';
import { AddJobComponent } from './add/addJob.component';
import { ObjComponent } from './component';
import { CvComponent } from './cv/cv.component';
import { DetailsComponent } from './details/details.component';
import { EditJobComponent } from './edit/edit.component';
import { ItemCandComponent } from './item-cand/item-cand.component';
import { RecruitComponent } from './recruit/recruit.component';
import { RoutingModule } from './routing.module';
import { ShowComponent } from './show/show.component';
@NgModule({
  declarations: [
    ObjComponent,
    ShowComponent,
    DetailsComponent,
    AddJobComponent,
    ItemCandComponent,
    EditJobComponent,
    CvComponent,
    RecruitComponent

  ],
  imports: [
    CommonModule,
    RoutingModule,
    NgxEditorModule,
    SharedModule
  ]
})
export class JobsModule { }
