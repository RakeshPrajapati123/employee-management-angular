import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/administration/user/user.service';
import { UserModel } from '../../../models/administration/user/user.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})

export class User implements OnInit {

  private userService = inject(UserService);
  private notificationService = inject(NotificationService);
 
  users: UserModel[] = [];
  filteredUsers: UserModel[] = [];

  searchText = '';
  statusFilter = 'All';

  loading = true;

  ngOnInit(): void {

    this.loadUsers();

  }

  loadUsers(): void {

    this.loading = true;

    this.userService.getUsers().subscribe({

      next: (response) => {

        this.users = response.data;

        this.filteredUsers = response.data;

        this.loading = false;

              
      },

      error: (error) => {

        console.error('User Error:', error);

        this.loading = false;

        this.notificationService.error(
          error?.error?.message || 'Unable to load users.'
        );

      }

    });

  }

  filterUsers(): void {

    const search = this.searchText
      .toLowerCase()
      .trim();

    this.filteredUsers = this.users.filter(user => {

      const matchesSearch =
        user.employeeName
          .toLowerCase()
          .includes(search) ||

        user.email
          .toLowerCase()
          .includes(search) ||

        (user.department?.toLowerCase().includes(search) ?? false) ||

        (user.designation?.toLowerCase().includes(search) ?? false) ||

        (user.role?.toLowerCase().includes(search) ?? false);

      const matchesStatus =
        this.statusFilter === 'All' ||
        user.isActive.toString() === this.statusFilter;

      return matchesSearch && matchesStatus;

    });

  }

  resetFilter(): void {

    this.searchText = '';

    this.statusFilter = 'All';

    this.filteredUsers = this.users;

  }

  toggleUserStatus(user: UserModel): void {

    const newStatus = !user.isActive;

    this.userService
      .updateUserStatus(user.loginID, newStatus)
      .subscribe({

        next: (response) => {

          this.notificationService.success(
            response.message ||
            (newStatus
              ? 'User activated successfully.'
              : 'User deactivated successfully.')
          );

          user.isActive = newStatus;

          this.filterUsers();

          },

        error: (error) => {

          console.error('Update User Status Error:', error);

          this.notificationService.error(
            error?.error?.message ||
            'Unable to update user status.'
          );

        }

      });

  }

}
