import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RoleService } from '../../../core/services/role/role.service';
import { RoleModel } from '../../../models/role/role.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './role-list.html',
  styleUrl: './role-list.css',
})

export class RoleList implements OnInit {

  private roleService = inject(RoleService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  searchText = '';

  statusFilter = 'All';

  roles = signal<RoleModel[]>([]);

  filteredRoles = signal<RoleModel[]>([]);

  showDeleteModal = false;

  roleToDelete: RoleModel | null = null;

  ngOnInit(): void {

    this.loadRoles();

  }

  loadRoles(): void {

    this.roleService.getRoles().subscribe({

      next: (response) => {

        this.roles.set(response.data);

        this.filteredRoles.set(response.data);

      },

      error: (error) => {

          this.notificationService.error(
          error?.error?.message ||
          'Unable to load roles.'
        );

      }

    });

  }

  filterRoles(): void {

    const search =
      this.searchText.toLowerCase().trim();

    const filtered =
      this.roles().filter(role => {

        const matchesName =
          role.roleName
            .toLowerCase()
            .includes(search);

        const matchesDescription =
          role.roleDescription
            .toLowerCase()
            .includes(search);

        const matchesStatus =
          this.statusFilter === 'All' ||
          role.isActive.toString() ===
          this.statusFilter;

        return (
          (matchesName ||
            matchesDescription) &&
          matchesStatus
        );

      });

    this.filteredRoles.set(filtered);

  }

  resetFilter(): void {

    this.searchText = '';

    this.statusFilter = 'All';

    this.filteredRoles.set(
      this.roles()
    );

  }

  viewRole(roleID: number): void {

    this.router.navigate([
      '/roles/details',
      roleID
    ]);

  }

  editRole(roleID: number): void {

    this.router.navigate([
      '/roles/edit',
      roleID
    ]);

  }

  deleteRole(role: RoleModel): void {

    this.roleToDelete = role;

    this.showDeleteModal = true;

  }

  closeDeleteModal(): void {

    this.showDeleteModal = false;

    this.roleToDelete = null;

  }

  confirmDelete(): void {

    if (!this.roleToDelete) {

      return;

    }

    const roleID =
      this.roleToDelete.roleID;

    this.roleService
      .deleteRole(roleID)
      .subscribe({

        next: (response) => {

          this.closeDeleteModal();

          this.loadRoles();

          this.notificationService.success(
            response.message ||
            'Role deleted successfully.'
          );

        },

        error: (error) => {

          this.closeDeleteModal();

          this.notificationService.error(
            error?.error?.message ||
            'Unable to delete role.'
          );

        }

      });

  }

}