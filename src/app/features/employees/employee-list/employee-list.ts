import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { EmployeeModel } from '../../../models/employee/employee.model';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../shared/services/notification.service';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink, FormsModule,CommonModule],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css'],
})

export class EmployeeList implements OnInit {

  private employeeService = inject(EmployeeService);

  private router = inject(Router);

  private notificationService = inject(NotificationService);

  searchText = '';

  statusFilter = 'All';

  employees = signal<EmployeeModel[]>([]);

  filteredEmployees = signal<EmployeeModel[]>([]);

  showDeleteModal = false;

employeeToDelete: EmployeeModel | null = null;

  ngOnInit(): void {

  this.loadEmployees();
 
}

    loadEmployees(): void {

  this.employeeService.getEmployees().subscribe({

    next: (response) => {

      this.employees.set(response.data);

      this.filteredEmployees.set(response.data);

    },

    error: (error) => {

    this.notificationService.error(
    error?.error?.message || 'Unable to load employees.'
  );

}

  });

}
  filterEmployees(): void {

  const search = this.searchText.toLowerCase().trim();

  const filtered = this.employees().filter(employee => {

    const matchesName =
      employee.employeeName.toLowerCase().includes(search);

    const matchesStatus =
      this.statusFilter === 'All' ||
      employee.isActive.toString() === this.statusFilter;

    return matchesName && matchesStatus;

  });

  this.filteredEmployees.set(filtered);

}

resetFilter(): void {

  this.searchText = '';

  this.statusFilter = 'All';

  this.filteredEmployees.set(this.employees());

}

viewEmployee(employeeID: number): void {

  this.router.navigate(['/employees/details', employeeID]);

}

deleteEmployee(employee: EmployeeModel): void {

  this.employeeToDelete = employee;

  this.showDeleteModal = true;

}

closeDeleteModal(): void {

  this.showDeleteModal = false;

  this.employeeToDelete = null;

}

confirmDelete(): void {

  if (!this.employeeToDelete) {
    return;
  }

  const employeeID = this.employeeToDelete.employeeID;

  this.employeeService.deleteEmployee(employeeID)
    .subscribe({

      next: (response) => {

        this.closeDeleteModal();

        this.loadEmployees();
        this.notificationService.success(
        response.message || 'Employee deleted successfully.'
  );
      },

      error: (error) => {

        this.closeDeleteModal();

        this.notificationService.error(
    error?.error?.message || 'Unable to delete employee.'
  );

      }

    });

}

}