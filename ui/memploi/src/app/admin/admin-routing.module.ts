import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminmoduleComponent } from './adminmodule.component';

const routes: Routes = [
  {
    path: '',
    component: AdminmoduleComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'categorie',
        loadChildren: () =>
          import('./categorie/categorie.module').then((m) => m.CategorieModule),
      }
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminModuleRoutingModule {}
