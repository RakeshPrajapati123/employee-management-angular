import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DepartmentService } from '../../../core/services/department/department.service';
import { DepartmentModel } from '../../../models/department/department.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-add-department',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './add-department.html',
  styleUrl: './add-department.css',
})

export class AddDepartment {

  private departmentService = inject(DepartmentService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  
    department: DepartmentModel = {
    departmentID: 0,
    departmentName: '',
    isActive: true,
  };

  addDepartment(): void {

    if (!this.department.departmentName.trim()) {

      this.notificationService.warning(
        'Department name is required.'
      );

      return;
    }

    this.departmentService
      .addDepartment(this.department)
      .subscribe({

        next: (response) => {

         this.router.navigate(['/departments']).then(() => {

            this.notificationService.success(
              response.message ||
              'Department added successfully.'
            );

          });

        },

        error: (error) => {

            this.notificationService.error(
            error?.error?.message ||
            'Unable to add department.'
          );

        }

      });

  }

}


