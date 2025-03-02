import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepotCvComponent } from './depot-cv.component';


const routes: Routes = [{ path: '', component: DepotCvComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepotCvRoutingModule { }
