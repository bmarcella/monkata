import { IndexComponent } from './tools/index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QNGuard } from './tools/helper/QNGuard';
import { BulletinGenComponent } from './tools/bulletin-gen/bulletin-gen.component';
import { PrintComponent } from './print/print.component';
import { RegisterComponent } from './tools/register/register.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/tools',
    pathMatch: 'full',
  },
  {
    path: 'app/tools',
    component: IndexComponent,
  },
    {
    path: 'app/register',
    component: RegisterComponent,
   },
    {
    path: 'app/print',
    component: PrintComponent,
  },
   {
    path: 'app/bulletinGen/:token',
     component: BulletinGenComponent,
     canActivate: [QNGuard],
  },
   {
    path: 'app/tools/:token',
     component: IndexComponent,
     canActivate: [QNGuard],
  },
  {
    path: '**',
    component: IndexComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
