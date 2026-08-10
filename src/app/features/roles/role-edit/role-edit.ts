import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoleService } from '../../../core/services/role/role.service';
import { RoleModel } from '../../../models/role/role.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
selector: 'app-role-edit',
standalone: true,
imports: [CommonModule, FormsModule, RouterLink],
templateUrl: './role-edit.html',
styleUrl: './role-edit.css'
})

export class RoleEdit implements OnInit {

private roleService = inject(RoleService);
private route = inject(ActivatedRoute);
private cdr = inject(ChangeDetectorRef);
private router = inject(Router);

private notificationService = inject(NotificationService);

role: RoleModel = {
roleID: 0,
roleName: '',
roleDescription: '',
isActive: true
};

roleID = 0;

isLoading = false;

isSaving = false;

ngOnInit(): void {

this.loadRole();

}

loadRole(): void {

this.roleID = Number(
  this.route.snapshot.paramMap.get('id')
);

if (!this.roleID) {

  this.notificationService.error(
    'Invalid role ID.'
  );

  this.router.navigate(['/roles']);

  return;

}

this.isLoading = true;

this.roleService
  .getRoleById(this.roleID)
  .subscribe({

    next: (response) => {

      console.log(
        'Role Edit API Response:',
        response
      );

      this.role = response.data;
      this.cdr.detectChanges();

      this.isLoading = false;

    },

    error: (error) => {

      console.error(
        'Role Edit Load Error:',
        error
      );

      this.isLoading = false;
      this.cdr.detectChanges();

      this.notificationService.error(
        error?.error?.message ||
        'Unable to load role.'
      );

    }

  });

}

updateRole(): void {

if (!this.role.roleName.trim()) {

  this.notificationService.error(
    'Role name is required.'
  );

  return;

}

if (!this.role.roleDescription.trim()) {

  this.notificationService.error(
    'Role description is required.'
  );

  return;

}

this.isSaving = true;

const roleData: RoleModel = {
  roleID: this.role.roleID,
  roleName: this.role.roleName.trim(),
  roleDescription: this.role.roleDescription.trim(),
  isActive: this.role.isActive
};

this.roleService
  .updateRole(this.roleID, roleData)
  .subscribe({

    next: (response) => {

      console.log(
        'Update Role Response:',
        response
      );

      this.isSaving = false;

      this.notificationService.success(
        response.message ||
        'Role updated successfully.'
      );

      this.router.navigate(['/roles']);

    },

    error: (error) => {

      console.error(
        'Update Role Error:',
        error
      );

      this.isSaving = false;

      this.notificationService.error(
        error?.error?.message ||
        'Unable to update role.'
      );

    }

  });

}

cancel(): void {

this.router.navigate(['/roles']);

}

}
