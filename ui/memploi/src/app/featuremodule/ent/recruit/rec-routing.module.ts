import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecComponent } from './rec.component';

const routes: Routes = [
  {
    path:"",
    component: RecComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecRoutingModule { }
