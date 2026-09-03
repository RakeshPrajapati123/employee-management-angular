import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DepartmentService } from '../../../core/services/department/department.service';
import { DepartmentModel } from '../../../models/department/department.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
selector: 'app-department-list',
standalone: true,
imports: [CommonModule, FormsModule, RouterLink],
templateUrl: './department-list.html',
styleUrl: './department-list.css',
})

export class DepartmentList implements OnInit {

private departmentService = inject(DepartmentService);
private router = inject(Router);
private notificationService = inject(NotificationService);

searchText = '';

statusFilter = 'All';

departments = signal<DepartmentModel[]>([]);

filteredDepartments = signal<DepartmentModel[]>([]);

showDeleteModal = false;

departmentToDelete: DepartmentModel | null = null;

ngOnInit(): void {

this.loadDepartments();

}

loadDepartments(): void {

this.departmentService.getDepartments().subscribe({

  next: (response) => {

    this.departments.set(response.data);

    this.filteredDepartments.set(response.data);

  },

  error: (error) => {

    this.notificationService.error(
      error?.error?.message || 'Unable to load departments.'
    );

  }

});


}

filterDepartments(): void {

const search = this.searchText.toLowerCase().trim();

const filtered = this.departments().filter(department => {

  const matchesName =
    department.departmentName
      .toLowerCase()
      .includes(search);

  const matchesStatus =
    this.statusFilter === 'All' ||
    department.isActive.toString() === this.statusFilter;

  return matchesName && matchesStatus;

});

this.filteredDepartments.set(filtered);


}

resetFilter(): void {

this.searchText = '';

this.statusFilter = 'All';

this.filteredDepartments.set(this.departments());

}

viewDepartment(departmentID: number): void {

this.router.navigate(['/departments/details', departmentID]);

}

editDepartment(departmentID: number): void {

this.router.navigate(['/departments/edit', departmentID]);

}

deleteDepartment(department: DepartmentModel): void {

this.departmentToDelete = department;

this.showDeleteModal = true;

}

closeDeleteModal(): void {

this.showDeleteModal = false;

this.departmentToDelete = null;

}

confirmDelete(): void {

  if (!this.departmentToDelete) {
    return;
  }

  const departmentID =
    this.departmentToDelete.departmentID;

  this.departmentService
    .deleteDepartment(departmentID)
    .subscribe({

      next: (response) => {

        this.closeDeleteModal();

        this.loadDepartments();

        this.notificationService.success(
          response.message ||
          'Department deleted successfully.'
        );

      },

      error: (error) => {

        this.closeDeleteModal();

        this.notificationService.error(
          error?.error?.message ||
          'Unable to delete department.'
        );

      }

    });

}

}
