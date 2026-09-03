import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../../core/services/department/department.service';
import { DepartmentModel } from '../../../models/department/department.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-department-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-report.html',
  styleUrl: './department-report.css',
})

export class DepartmentReport implements OnInit {

  private departmentService = inject(DepartmentService);
  private notificationService = inject(NotificationService);
  
  departments: DepartmentModel[] = [];
  filteredDepartments: DepartmentModel[] = [];

  searchText = '';
  statusFilter = 'All';

  loading = true;

  ngOnInit(): void {

    this.loadDepartments();

  }

  loadDepartments(): void {

    this.loading = true;

    this.departmentService.getDepartments().subscribe({

      next: (response) => {

        this.departments = response.data;

        this.filteredDepartments = response.data;

        this.loading = false;

      },

      error: (error) => {

        this.loading = false;

        this.notificationService.error(
          error?.error?.message || 'Unable to load department report.'
        );

      }

    });

  }

  filterDepartments(): void {

    const search = this.searchText
      .toLowerCase()
      .trim();

    this.filteredDepartments = this.departments.filter(department => {

      const matchesSearch =
        department.departmentName
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        this.statusFilter === 'All' ||
        department.isActive.toString() === this.statusFilter;

      return matchesSearch && matchesStatus;

    });

  }

  resetFilter(): void {

    this.searchText = '';

    this.statusFilter = 'All';

    this.filteredDepartments = this.departments;

  }

}