import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CrosstokenComponent } from './crosstoken/crosstoken.component';
import { notYetLoginGuard } from '../Guards/not-yet-login.guard';

const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
      canActivate: [notYetLoginGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
      canActivate: [notYetLoginGuard]
  },

  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupModule),
      canActivate: [notYetLoginGuard]
  },
  {
    path: 'login-cross-token/:token',
    loadChildren: () =>
      import('./crosstoken/cross.module').then((m) => m.CrossModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
