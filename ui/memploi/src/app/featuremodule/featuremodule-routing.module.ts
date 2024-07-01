import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { CrosstokenComponent } from '../crosstoken/crosstoken.component';
import { AuthGuard } from '../Guards/auth.guard';
import { FeaturemoduleComponent } from './featuremodule.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturemoduleComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeEightModule),
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./jobs/jobs.module').then((m) => m.JobsModule),
      },
      {
        path: 'entreprise',
        loadChildren: () =>
          import('./compagny/compagny.module').then((m) => m.CompagnyModule),
      },
      {
        path: 'details-job/:id',
        loadChildren: () =>
          import('./details-job/details-job.module').then((m) => m.DetailsJobModule),
      },
      {
        path: 'job/apply/:id',
        loadChildren: () =>
          import('./apply/apply.module').then((m) => m.ApplyModule),
        canActivateChild : [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
          canActivateChild : [AuthGuard]
      },
      {
        path: 'compagny',
        loadChildren: () =>
          import('./ent/ent-profile.module').then((m) => m.EntProfileModule),
          canActivateChild : [AuthGuard]
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact-routing.module').then((m) => m.ContactRoutingModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'terms-condition',
        loadChildren: () =>
          import('./terms-condition/terms-condition.module').then((m) => m.TermsConditionModule),
      },
    ],
  },
  {
    path: 'auth/login-cross-token/:token',
    component: CrosstokenComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturemoduleRoutingModule { }
