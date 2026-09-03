import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DesignationService } from '../../../core/services/designation/designation.service';
import { DesignationModel } from '../../../models/designation/designation.model';
import { NotificationService } from '../../../shared/services/notification.service';
import { AddDesignationModel } from '../../../models/designation/add-designation.model';
import { DepartmentModel } from '../../../models/department/department.model';
import { DepartmentService } from '../../../core/services/department/department.service';

@Component({
  selector: 'app-designation-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './designation-add.html',
  styleUrl: './designation-add.css',
})

export class DesignationAdd {

private designationService = inject(DesignationService);

  private router = inject(Router);

  private departmentService = inject(DepartmentService);

  private notificationService = inject(NotificationService);

  departments: DepartmentModel[] = [];

  designation: AddDesignationModel = {

    departmentID: 0,

    designationName: '',

    isActive: true,

  };

  ngOnInit(): void {

    this.loadDepartments();

  }

  loadDepartments(): void {

    this.departmentService
      .getDepartments()
      .subscribe({

        next: (response) => {

          this.departments = response.data;

        },

        error: (error) => {

            this.notificationService.error(
            error?.error?.message ||
            'Unable to load departments.'
          );

        }

      });

  }

  addDesignation(): void {

    if (this.designation.departmentID === 0) {

      this.notificationService.error(
        'Please select a department.'
      );

      return;

    }

    if (!this.designation.designationName.trim()) {

      this.notificationService.error(
        'Please enter designation name.'
      );

      return;

    }

    this.designationService
      .addDesignation(this.designation)
      .subscribe({

        next: (response) => {

          this.notificationService.success(
            response.message ||
            'Designation added successfully.'
          );

          this.router.navigate([
            '/designations'
          ]);

        },

        error: (error) => {

            this.notificationService.error(
            error?.error?.message ||
            'Unable to add designation.'
          );

        }

      });

  }

}
