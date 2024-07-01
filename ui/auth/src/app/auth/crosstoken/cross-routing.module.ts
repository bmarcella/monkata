import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrosstokenComponent } from './crosstoken.component';

const routes: Routes = [
  { path: '', component: CrosstokenComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule],
})
export class CrossRoutingModule { }
