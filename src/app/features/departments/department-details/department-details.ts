import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DepartmentService } from '../../../core/services/department/department.service';
import { DepartmentModel } from '../../../models/department/department.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-department-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './department-details.html',
  styleUrl: './department-details.css',
})

export class DepartmentDetails implements OnInit {

  private departmentService = inject(DepartmentService);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  department: DepartmentModel | null = null;

  departmentID!: number;

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

  this.department = response.data;

  },

        error: (error) => {

            this.notificationService.error(
            error?.error?.message ||
            'Unable to load department details.'
          );

        }

      });

  }

}