import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserCvComponent } from './edit-user-cv.component';

const routes: Routes = [{
  path:"",
  component: EditUserCvComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUserRoutingModule { }
