import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { CrosstokenComponent } from './crosstoken/crosstoken.component';
import { AuthGuard } from './Guards/auth.guard';
import { notYetLoginGuard } from './Guards/not-yet-login.guard';
import {
  ContentComponent,
} from './shared/components/layout/content/content.component';
import { content } from './shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/home',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate:[notYetLoginGuard]
  },
  {
    path: '',
    component: ContentComponent,
    children: content,
    canActivateChild : [AuthGuard]
  },
  {
    path: 'auth/login-cross-token/:token',
    component: CrosstokenComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
  })],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
