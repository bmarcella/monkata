import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEntComponent } from './add-ent.component';

const routes: Routes = [{ path: '', component: AddEntComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddListingRoutingModule { }
