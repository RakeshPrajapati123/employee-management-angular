import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RoleService } from '../../../core/services/role/role.service';
import { RoleModel } from '../../../models/role/role.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
selector: 'app-role-details',
standalone: true,
imports: [CommonModule, RouterLink],
templateUrl: './role-details.html',
styleUrl: './role-details.css'
})

export class RoleDetails implements OnInit {

private route = inject(ActivatedRoute);
private cdr = inject(ChangeDetectorRef);
private roleService = inject(RoleService);

private notificationService = inject(NotificationService);

role: RoleModel | null = null;

ngOnInit(): void {

this.loadRole();

}

loadRole(): void {

const roleID = Number(
  this.route.snapshot.paramMap.get('id')
);

if (!roleID) {

  this.notificationService.error(
    'Invalid role ID.'
  );

  return;

}

this.roleService
  .getRoleById(roleID)
  .subscribe({

    next: (response) => {

      console.log(
        'Role Details API Response:',
        response
      );

      this.role = response.data;
      this.cdr.detectChanges();

    },

    error: (error) => {

      console.error(
        'Role Details Load Error:',
        error
      );

      this.notificationService.error(
        error?.error?.message ||
        'Unable to load role details.'
      );

    }

  });

}

}

