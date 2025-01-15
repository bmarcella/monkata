import { Routes } from '@angular/router';

export const MEMPLOI_ROUTES: Routes = [
  {
    path: 'recruitment',
    loadComponent: () => import('../../components/admin/recruitment/recruitment.component')
      .then(m => m.RecruitmentComponent)
  },
  {
    path: 'employees',
    loadComponent: () => import('../../components/admin/employees/employees.component')
      .then(m => m.EmployeesComponent)
  },
  {
    path: 'attendance',
    loadComponent: () => import('../../components/admin/attendance/attendance.component')
      .then(m => m.AttendanceComponent)
  },
  {
    path: 'requests',
    loadComponent: () => import('../../components/admin/requests/requests.component')
      .then(m => m.RequestsComponent)
  },
  {
    path: 'payroll',
    loadComponent: () => import('../../components/admin/payroll/payroll.component')
      .then(m => m.PayrollComponent)
  },
  {
    path: 'materials',
    loadComponent: () => import('../../components/admin/materials/materials.component')
      .then(m => m.MaterialsComponent)
  },
  {
    path: 'legal',
    loadComponent: () => import('../../components/admin/legal/legal.component')
      .then(m => m.LegalComponent)
  },
  {
    path: 'documents',
    loadComponent: () => import('../../components/admin/documents/documents.component')
      .then(m => m.DocumentsComponent)
  },
  {
    path: 'configurations',
    loadComponent: () => import('../../components/admin/memploi-configurations/memploi-configurations.component')
      .then(m => m.MemploiConfigurationsComponent)
  }
];