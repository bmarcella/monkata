import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ShowComponent } from './show/show.component';



const routes: Routes = [
  {
    path: "show",
    component : ShowComponent
  },
  {
    path: "details/:id",
    component : DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
