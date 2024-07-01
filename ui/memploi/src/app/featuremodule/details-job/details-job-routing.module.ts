import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsJobComponent } from './details-job.component';

const routes: Routes = [
  { path: '', component: DetailsJobComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsJobRoutingModule { }
