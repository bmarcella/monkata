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
        import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    },
    {
      path: 'edit-profile',
      loadChildren: () =>
        import('./edit-user/edit-user.module').then((m) => m.EditUserModule),
    },
    {
      path: 'cv',
      loadChildren: () =>
        import('./cv/edit-user-cv.module').then((m) => m.EditUserCvModule),
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
