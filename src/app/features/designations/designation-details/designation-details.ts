import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DesignationService } from '../../../core/services/designation/designation.service';
import { DesignationModel } from '../../../models/designation/designation.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-designation-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './designation-details.html',
  styleUrl: './designation-details.css',
})

export class DesignationDetails implements OnInit {

  private designationService = inject(DesignationService);

  private route = inject(ActivatedRoute);

  private notificationService = inject(NotificationService);

  designation: DesignationModel | null = null;

  designationID!: number;

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
          
        },

        error: (error) => {

            this.notificationService.error(
            error?.error?.message ||
            'Unable to load designation details.'
          );

        }

      });

  }

}