import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      import('./featuremodule/featuremodule.module').then(
        (m) => m.FeaturemoduleModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },
  {
    path: 'jobs',
    loadChildren: () =>
      import('./jobsmodule/jobs.module').then(
        (m) => m.JobsModule
      ),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
