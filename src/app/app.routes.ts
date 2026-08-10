import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Login } from './features/auth/login/login';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { EmployeeDetails } from './features/employees/employee-details/employee-details';
import { EmployeeList } from './features/employees/employee-list/employee-list';
import { AddEmployee } from './features/employees/add-employee/add-employee';
import { EditEmployee } from './features/employees/edit-employee/edit-employee';
import { DepartmentList } from './features/departments/department-list/department-list';
import { AddDepartment } from './features/departments/add-department/add-department';
import { EditDepartment } from './features/departments/edit-department/edit-department';
import { DepartmentDetails } from './features/departments/department-details/department-details';
import { DesignationList } from './features/designations/designation-list/designation-list';
import { DesignationAdd } from './features/designations/designation-add/designation-add';
import { DesignationDetails } from './features/designations/designation-details/designation-details';
import { DesignationEdit } from './features/designations/designation-edit/designation-edit';  
import { RoleList } from './features/roles/role-list/role-list';
import { RoleDetails } from './features/roles/role-details/role-details';
import { RoleAdd } from './features/roles/role-add/role-add';
import { RoleEdit } from './features/roles/role-edit/role-edit';

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

      {
        path: 'employees/details/:id',
        loadComponent: () =>
          import('./features/employees/employee-details/employee-details').then((m) => m.EmployeeDetails),
      },

      {
        path: 'employees/edit/:id',
        loadComponent: () =>
          import('./features/employees/edit-employee/edit-employee').then((m) => m.EditEmployee),
      },

      // ================= Department Routes =================

  {
    path: 'departments',
    loadComponent: () =>
      import('./features/departments/department-list/department-list')
        .then(m => m.DepartmentList)
  },

  {
    path: 'departments/add',
    loadComponent: () =>
      import('./features/departments/add-department/add-department')
        .then(m => m.AddDepartment)
  },

  {
    path: 'departments/edit/:id',
    loadComponent: () =>
      import('./features/departments/edit-department/edit-department')
        .then(m => m.EditDepartment)
  },

  {
    path: 'departments/details/:id',
    loadComponent: () =>
      import('./features/departments/department-details/department-details')
        .then(m => m.DepartmentDetails)
  },

  // ================= Designation Routes =================

  {
  path: 'designations',
  loadComponent: () =>
    import('./features/designations/designation-list/designation-list')
      .then(m => m.DesignationList)
},

{
  path: 'designations/add',
  loadComponent: () =>
    import('./features/designations/designation-add/designation-add')
      .then(m => m.DesignationAdd)
},

{
  path: 'designations/details/:id',
  loadComponent: () =>
    import('./features/designations/designation-details/designation-details')
      .then(m => m.DesignationDetails)
},

{
  path: 'designations/edit/:id',
  loadComponent: () =>
    import('./features/designations/designation-edit/designation-edit')
      .then(m => m.DesignationEdit)
},

// ================= Role Routes =================

{
  path: 'roles',
  loadComponent: () =>
    import('./features/roles/role-list/role-list')
      .then(m => m.RoleList)
},

{
  path: 'roles/add',
  loadComponent: () =>
    import('./features/roles/role-add/role-add')
      .then(m => m.RoleAdd)
},

{
  path: 'roles/details/:id',
  loadComponent: () =>
    import('./features/roles/role-details/role-details')
      .then(m => m.RoleDetails)
},

{
  path: 'roles/edit/:id',
  loadComponent: () =>
    import('./features/roles/role-edit/role-edit')
      .then(m => m.RoleEdit)
},

    ],
  },
];
