import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      import('./featuremodule/featuremodule.module').then(
        (m) => m.FeaturemoduleModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule)
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
export class AppRoutingModule { }
