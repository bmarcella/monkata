import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Guards/auth.guard';
import { EntGuard } from '../Guards/ent.guard';
import { JobsmoduleComponent } from './jobsmodule.component';

const routes: Routes = [
  {
    path: '',
    component: JobsmoduleComponent,
    children: [
      {
        path: 'add-job',
        loadChildren: () =>
          import('./add-job/add-job.module').then((m) => m.AddJobgModule),
          canActivateChild: [AuthGuard]
      },
      {
        path: 'edit-job/:id',
        loadChildren: () =>
          import('./edit-job/edit-job.module').then((m) => m.EditJobModule),
          canActivateChild: [AuthGuard]
      },
      {
        path: 'add-ent',
        loadChildren: () =>
          import('./add-ent/add-ent.module').then((m) => m.AddEntModule),
          canActivateChild: [EntGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
