import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RoleService } from '../../../core/services/role/role.service';
import { RoleModel } from '../../../models/role/role.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-role-add',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './role-add.html',
  styleUrl: './role-add.css',
})

export class RoleAdd {

  private roleService = inject(RoleService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  role: RoleModel = {
    roleID: 0,
    roleName: '',
    roleDescription: '',
    isActive: true,
  };

  addRole(): void {

    if (!this.role.roleName.trim()) {

      this.notificationService.warning(
        'Role name is required.'
      );

      return;
    }

    this.roleService
      .addRole(this.role)
      .subscribe({

        next: (response) => {

          console.log(
            'Role added successfully:',
            response
          );

          this.router.navigate(['/roles']).then(() => {

            this.notificationService.success(
              response.message ||
              'Role added successfully.'
            );

          });

        },

        error: (error) => {

          console.error(
            'Error adding role:',
            error
          );

          this.notificationService.error(
            error?.error?.message ||
            'Unable to add role.'
          );

        }

      });

  }

}




