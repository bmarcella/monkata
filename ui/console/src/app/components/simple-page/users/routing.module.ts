import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { DetailsUsersComponent } from './details-users/details-users.component';
import { ShowUsersComponent } from './show-users/show-users.component';



const routes: Routes = [
  {
    path: "show",
    component : ShowUsersComponent
  },
  {
    path: "details/:id",
    component : DetailsUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
