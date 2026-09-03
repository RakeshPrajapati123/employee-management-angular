import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { EmployeeModel } from '../../../models/employee/employee.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-employee-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-report.html',
  styleUrl: './employee-report.css',
})

export class EmployeeReport implements OnInit {

  private employeeService = inject(EmployeeService);
  private notificationService = inject(NotificationService);
  
  employees: EmployeeModel[] = [];
  filteredEmployees: EmployeeModel[] = [];

  searchText = '';
  statusFilter = 'All';

  loading = true;

  ngOnInit(): void {

    this.loadEmployees();

  }

  loadEmployees(): void {

    this.loading = true;

    this.employeeService.getEmployees().subscribe({

      next: (response) => {

        this.employees = response.data;

        this.filteredEmployees = response.data;

        this.loading = false;

        },

      error: (error) => {

        this.loading = false;

        this.notificationService.error(
          error?.error?.message || 'Unable to load employee report.'
        );

      }

    });

  }

  filterEmployees(): void {

    const search = this.searchText
      .toLowerCase()
      .trim();

    this.filteredEmployees = this.employees.filter(employee => {

      const matchesSearch =
        employee.employeeName
          .toLowerCase()
          .includes(search) ||

          employee.phone
          .toLowerCase()
          .includes(search) ||

        employee.departmentName
          .toLowerCase()
          .includes(search) ||

        employee.designationName
          .toLowerCase()
          .includes(search) ||

        employee.roleName
          .toLowerCase()
          .includes(search);


      const matchesStatus =
        this.statusFilter === 'All' ||
        employee.isActive.toString() === this.statusFilter;


      return matchesSearch && matchesStatus;

    });

  }

  resetFilter(): void {

    this.searchText = '';

    this.statusFilter = 'All';

    this.filteredEmployees = this.employees;

  }

}