import { Routes } from '@angular/router';

export const MONKATA_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('../../components/admin/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'companies',
    loadComponent: () => import('../../components/admin/companies/companies.component')
      .then(m => m.CompaniesComponent)
  },
  {
    path: 'apps',
    loadComponent: () => import('../../components/admin/apps/apps.component')
      .then(m => m.AppsComponent)
  },
  {
    path: 'plans',
    loadComponent: () => import('../../components/admin/plans/plans.component')
      .then(m => m.PlansComponent)
  },
  {
    path: 'configurations',
    loadComponent: () => import('../../components/admin/configurations/configurations.component')
      .then(m => m.ConfigurationsComponent)
  }
];