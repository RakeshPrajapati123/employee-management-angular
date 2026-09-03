import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DesignationService } from '../../../core/services/designation/designation.service';
import { DesignationModel } from '../../../models/designation/designation.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-designation-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule ],
  templateUrl: './designation-list.html',
  styleUrl: './designation-list.css',
})
export class DesignationList implements OnInit {

  private designationService = inject(DesignationService);

  private router = inject(Router);

  private notificationService = inject(NotificationService);

  searchText = '';

  statusFilter = 'All';

  designations = signal<DesignationModel[]>([]);

  filteredDesignations = signal<DesignationModel[]>([]);

  showDeleteModal = false;

  designationToDelete: DesignationModel | null = null;

  ngOnInit(): void {

    this.loadDesignations();

  }

  loadDesignations(): void {

    this.designationService.getDesignations().subscribe({

      next: (response) => {

        this.designations.set(response.data);

        this.filteredDesignations.set(response.data);

      },

      error: (error) => {

          this.notificationService.error(
          error?.error?.message ||
          'Unable to load designations.'
        );

      }

    });

  }

  filterDesignations(): void {

    const search =
      this.searchText.toLowerCase().trim();

    const filtered =
      this.designations().filter(designation => {

        const matchesName =
          designation.designationName
            .toLowerCase()
            .includes(search);

        const matchesStatus =
          this.statusFilter === 'All' ||
          designation.isActive.toString() ===
          this.statusFilter;

        return matchesName && matchesStatus;

      });

    this.filteredDesignations.set(filtered);

  }

  resetFilter(): void {

    this.searchText = '';

    this.statusFilter = 'All';

    this.filteredDesignations.set(
      this.designations()
    );

  }

  viewDesignation(designationID: number): void {

    this.router.navigate([
      '/designations/details',
      designationID
    ]);

  }

  editDesignation(designationID: number): void {

    this.router.navigate([
      '/designations/edit',
      designationID
    ]);

  }

  deleteDesignation(
    designation: DesignationModel
  ): void {

    this.designationToDelete = designation;

    this.showDeleteModal = true;

  }

  closeDeleteModal(): void {

    this.showDeleteModal = false;

    this.designationToDelete = null;

  }

  confirmDelete(): void {

    if (!this.designationToDelete) {

      return;

    }

    const designationID =
      this.designationToDelete.designationID;

    this.designationService
      .deleteDesignation(designationID)
      .subscribe({

        next: (response) => {

          this.closeDeleteModal();

          this.loadDesignations();

          this.notificationService.success(
            response.message ||
            'Designation deleted successfully.'
          );

        },

        error: (error) => {

          this.closeDeleteModal();

          this.notificationService.error(
            error?.error?.message ||
            'Unable to delete designation.'
          );

        }

      });

  }

}