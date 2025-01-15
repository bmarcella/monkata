
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrepriseDetailsComponent } from './EntrepriseDetails.component';

const routes: Routes = [
  { path: 'details/:id', component: EntrepriseDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepriseDetailsRoutingModule { }