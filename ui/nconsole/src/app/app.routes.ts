import { Routes } from '@angular/router';
import { CrosstokenComponent } from './auth/crosstoken/crosstoken.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './Guards/auth.guard';
import { notYetLoginGuard } from './Guards/not-yet-login.guard';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'monkata',
        loadChildren: () => import('./modules/monkata/monkata.routes')
          .then(m => m.MONKATA_ROUTES),
          canActivateChild : [AuthGuard]
      },
      {
        path: 'memploi',
        loadChildren: () => import('./modules/memploi/memploi.routes')
          .then(m => m.MEMPLOI_ROUTES),
          canActivateChild : [AuthGuard]
      },
      { 
        path: '', redirectTo: 'monkata/dashboard',
        pathMatch: 'full'
       }
    ]
  },
  {
    path: 'auth/login-cross-token/:token',
    component: CrosstokenComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate : [notYetLoginGuard]
  },
];