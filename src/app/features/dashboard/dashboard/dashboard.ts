import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { DepartmentService } from '../../../core/services/department/department.service';
import { DesignationService } from '../../../core/services/designation/designation.service';
import { RoleService } from '../../../core/services/role/role.service';
import { EmployeeModel } from '../../../models/employee/employee.model';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {

  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private designationService = inject(DesignationService);
  private roleService = inject(RoleService);

  totalEmployees = signal(0);
  activeEmployees = signal(0);
  inactiveEmployees = signal(0);

  totalDepartments = signal(0);
  totalDesignations = signal(0);
  totalRoles = signal(0);
  recentEmployees = signal<EmployeeModel[]>([]);

ngOnInit(): void {

    this.loadDashboardData();

}

loadDashboardData(): void {

    this.employeeService.getEmployees().subscribe({

      next: (response) => {

        const employees = response.data;

        this.totalEmployees.set(employees.length);

        this.activeEmployees.set(
          employees.filter(employee => employee.isActive).length
        );

        this.inactiveEmployees.set(
          employees.filter(employee => !employee.isActive).length
        );

        // Get 5 most recently added employees
    const recentEmployees = [...employees]
      .sort(
        (a, b) =>
          new Date(b.createdDate).getTime() -
          new Date(a.createdDate).getTime()
      )
      .slice(0, 5);

    this.recentEmployees.set(recentEmployees);


      },

      error: (error) => {

        
      }

    });


    this.departmentService.getDepartments().subscribe({

      next: (response) => {

        this.totalDepartments.set(response.data.length);

      },

      error: (error) => {

        }

    });


    this.designationService.getDesignations().subscribe({

      next: (response) => {

        this.totalDesignations.set(response.data.length);

      },

      error: (error) => {

        
      }

    });


    this.roleService.getRoles().subscribe({

      next: (response) => {

        this.totalRoles.set(response.data.length);

      },

      error: (error) => {

        
      }

    });

  }

}


