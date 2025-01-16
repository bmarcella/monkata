import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';




import { SharedModule } from '../../../shared/shared.module';
import { ObjComponent } from './component';
import { DetailsUsersComponent } from './details-users/details-users.component';
import { FreeCandComponent } from './freecand/FreeCand.component';
import { RoutingModule } from './routing.module';
import { ShowUsersComponent } from './show-users/show-users.component';

@NgModule({
  declarations: [
    ObjComponent,
    ShowUsersComponent,
    DetailsUsersComponent,
    FreeCandComponent,
  ],
  imports: [
    CommonModule,
    RoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
