import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { DetailsEntComponent } from './details-ent/details-ent.component';
import { ShowEntComponent } from './show-ent/show-ent.component';

const routes: Routes = [
  {
    path: "show",
    component : ShowEntComponent
  },
  {
    path: "details/:id",
    component : DetailsEntComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntsRoutingModule { }
