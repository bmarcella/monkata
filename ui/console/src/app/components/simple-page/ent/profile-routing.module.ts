import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [  {
  path: '',
  component: ProfileComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home',
    },
    {
      path: 'home',
      loadChildren: () =>
        import('./dashboard/ent-dashboard.module').then((m) => m.EntDashboardModule),
    },
    {
      path: 'entreprise',
      loadChildren: () =>
        import('./entreprise/entreprise.module').then((m) => m.EntrepriseModule),
    },
    {
      path: 'recruitement',
      loadChildren: () =>
        import('./recruit/rec.module').then((m) => m.RecModule),
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
