import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DesignationService } from '../../../core/services/designation/designation.service';
import { DepartmentService } from '../../../core/services/department/department.service';
import { DesignationModel } from '../../../models/designation/designation.model';
import { DepartmentModel } from '../../../models/department/department.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-designation-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './designation-edit.html',
  styleUrl: './designation-edit.css',
})

export class DesignationEdit implements OnInit {

  private designationService = inject(DesignationService);

  private departmentService = inject(DepartmentService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private notificationService = inject(NotificationService);

  departments: DepartmentModel[] = [];

  designationID!: number;

  designation: DesignationModel = {

    designationID: 0,

    departmentID: 0,

    designationName: '',

    departmentName: '',

    isActive: true,
    
  };

  ngOnInit(): void {

    this.designationID = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadDesignation();

    this.loadDepartments();

  }

  loadDesignation(): void {

    this.designationService
      .getDesignationById(this.designationID)
      .subscribe({

        next: (response) => {

          this.designation = response.data;
         
        },

        error: (error) => {

            this.notificationService.error(
            error?.error?.message ||
            'Unable to load designation.'
          );

        }

      });

  }

  loadDepartments(): void {
  this.departmentService.getDepartments().subscribe({
    next: (response) => {
      this.departments = response.data.filter((x) => x.isActive);
    },

    error: (error) => {
      
      this.notificationService.error(
        error?.error?.message || 'Unable to load departments.'
      );
    },
  });
}
  updateDesignation(): void {

    this.designationService
      .updateDesignation(
        this.designationID,
        this.designation
      )
      .subscribe({

        next: (response) => {

          this.notificationService.success(
            response.message ||
            'Designation updated successfully.'
          );

          this.router.navigate([
            '/designations'
          ]);

        },

        error: (error) => {

            this.notificationService.error(
            error?.error?.message ||
            'Unable to update designation.'
          );

        }

      });

  }

}