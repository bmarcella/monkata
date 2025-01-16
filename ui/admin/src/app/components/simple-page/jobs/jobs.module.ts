import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';




import { SharedModule } from '../../../shared/shared.module';
import { ObjComponent } from './component';
import { DetailsComponent } from './details/details.component';
import { RoutingModule } from './routing.module';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    ObjComponent,
    ShowComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    SharedModule
  ]
})
export class JobsModule { }
