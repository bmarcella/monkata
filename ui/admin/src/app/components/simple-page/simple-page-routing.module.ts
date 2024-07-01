import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { EntsComponent } from './ents/ents.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "home",
        component: FirstPageComponent,
      },
      {
        path: "second-page",
        component: SecondPageComponent,
      },
    ],
  },
  {
    path: "entreprise",
    component: EntsComponent,
    loadChildren: () => import("./ents/ents.module").then((m) => m.EntsModule),
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimplePageRoutingModule {}
