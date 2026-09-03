import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // ================= Root =================

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },


  // ================= Authentication =================

  {
    path: '',
    component: AuthLayout,

    children: [

      {
        path: 'login',

        loadComponent: () =>
          import('./features/auth/login/login')
            .then(m => m.Login),
      },

    ],
  },


  // ================= Admin =================

  {
    path: '',
    component: AdminLayout,

    children: [

      // ================= Dashboard =================

      {
        path: 'dashboard',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard')
            .then(m => m.Dashboard),
      },


      // ================= Change Password =================

      {
        path: 'change-password',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/change-password/change-password/change-password')
            .then(m => m.ChangePassword),
      },


      // ================= Reports =================

      {
        path: 'reports/employees',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/reports/employee-report/employee-report')
            .then(m => m.EmployeeReport),
      },

      {
        path: 'reports/departments',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/reports/department-report/department-report')
            .then(m => m.DepartmentReport),
      },


      // ================= Employees =================

      {
        path: 'employees',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/employees/employee-list/employee-list')
            .then(m => m.EmployeeList),
      },

      {
        path: 'employees/add',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/employees/add-employee/add-employee')
            .then(m => m.AddEmployee),
      },

      {
        path: 'employees/details/:id',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/employees/employee-details/employee-details')
            .then(m => m.EmployeeDetails),
      },

      {
        path: 'employees/edit/:id',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/employees/edit-employee/edit-employee')
            .then(m => m.EditEmployee),
      },


      // ================= Departments =================

      {
        path: 'departments',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/departments/department-list/department-list')
            .then(m => m.DepartmentList),
      },

      {
        path: 'departments/add',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/departments/add-department/add-department')
            .then(m => m.AddDepartment),
      },

      {
        path: 'departments/edit/:id',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/departments/edit-department/edit-department')
            .then(m => m.EditDepartment),
      },

      {
        path: 'departments/details/:id',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/departments/department-details/department-details')
            .then(m => m.DepartmentDetails),
      },


      // ================= Designations =================

      {
        path: 'designations',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/designations/designation-list/designation-list')
            .then(m => m.DesignationList),
      },

      {
        path: 'designations/add',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/designations/designation-add/designation-add')
            .then(m => m.DesignationAdd),
      },

      {
        path: 'designations/details/:id',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/designations/designation-details/designation-details')
            .then(m => m.DesignationDetails),
      },

      {
        path: 'designations/edit/:id',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/designations/designation-edit/designation-edit')
            .then(m => m.DesignationEdit),
      },


      // ================= Roles =================

      {
        path: 'roles',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/roles/role-list/role-list')
            .then(m => m.RoleList),
      },

      {
        path: 'roles/add',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/roles/role-add/role-add')
            .then(m => m.RoleAdd),
      },

      {
        path: 'roles/details/:id',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/roles/role-details/role-details')
            .then(m => m.RoleDetails),
      },

      {
        path: 'roles/edit/:id',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/roles/role-edit/role-edit')
            .then(m => m.RoleEdit),
      },


      // ================= Profile =================

      {
        path: 'profile',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/profile/profile/profile')
            .then(m => m.Profile),
      },


      // ================= Administrator =================

      {
        path: 'administrator/users',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./features/administrator/users/users')
            .then(m => m.User),
      },

    ],
  },

];