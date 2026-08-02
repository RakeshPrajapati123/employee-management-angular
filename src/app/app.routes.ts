import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Login } from './features/auth/login/login';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Dashboard } from './features/dashboard/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
      },
    ],
  },

  {
    path: '',
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },

      {
        path: 'employees',
        loadComponent: () =>
          import('./features/employees/employee-list/employee-list').then((m) => m.EmployeeList),
      },

      {
        path: 'employees/add',
        loadComponent: () =>
          import('./features/employees/add-employee/add-employee').then((m) => m.AddEmployee),
      },
    ],
  },
];
