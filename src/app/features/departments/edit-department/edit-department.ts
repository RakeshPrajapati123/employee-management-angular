import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../../core/services/department/department.service';
import { DepartmentModel } from '../../../models/department/department.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-edit-department',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-department.html',
  styleUrl: './edit-department.css',
})

export class EditDepartment implements OnInit {
  
  private departmentService = inject(DepartmentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  departmentID!: number;

  department: DepartmentModel = {
    departmentID: 0,
    departmentName: '',
    isActive: true,
  };

  ngOnInit(): void {

    this.departmentID = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadDepartment();

  }

  loadDepartment(): void {

    this.departmentService
      .getDepartmentById(this.departmentID)
      .subscribe({

        next: (response) => {

          console.log('Department API Response:', response);

          this.department = response.data;

          console.log('Department:', this.department);

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error loading department:',
            error
          );

          this.notificationService.error(
            error?.error?.message ||
            'Unable to load department details.'
          );

        }

      });

  }

  updateDepartment(): void {

    if (!this.department.departmentName.trim()) {

      this.notificationService.warning(
        'Department name is required.'
      );

      return;

    }

    this.departmentService
      .updateDepartment(
        this.departmentID,
        this.department
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Department updated successfully:',
            response
          );

          this.router.navigate(['/departments']).then(() => {

            this.notificationService.success(
              response.message ||
              'Department updated successfully.'
            );

          });

        },

        error: (error) => {

          console.error(
            'Error updating department:',
            error
          );

          this.notificationService.error(
            error?.error?.message ||
            'Unable to update department.'
          );

        }

      });

  }

}