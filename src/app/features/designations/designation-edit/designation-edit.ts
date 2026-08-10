import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DesignationService } from '../../../core/services/designation/designation.service';
import { DesignationModel } from '../../../models/designation/designation.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-designation-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './designation-edit.html',
  styleUrl: './designation-edit.css',
})

export class DesignationEdit implements OnInit {

  private designationService = inject(DesignationService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private cdr = inject(ChangeDetectorRef);

  private notificationService = inject(NotificationService);

  designationID!: number;

  designation: DesignationModel = {

    designationID: 0,

    departmentID: 0,

    designationName: '',

    isActive: true,

    department: null

  };

  ngOnInit(): void {

    this.designationID = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadDesignation();

  }

  loadDesignation(): void {

    this.designationService
      .getDesignationById(this.designationID)
      .subscribe({

        next: (response) => {

          this.designation = response.data;
          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error loading designation:',
            error
          );

          this.notificationService.error(
            error?.error?.message ||
            'Unable to load designation.'
          );

        }

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

          console.error(
            'Designation Update Error:',
            error
          );

          this.notificationService.error(
            error?.error?.message ||
            'Unable to update designation.'
          );

        }

      });

  }

}