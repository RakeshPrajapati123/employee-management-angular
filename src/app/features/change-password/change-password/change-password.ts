import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ChangePasswordRequest } from '../../../models/auth/change-password-request';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})

export class ChangePassword {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);


  changePasswordForm = this.fb.group({

    currentPassword: [
      '',
      [Validators.required]
    ],

    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100)
      ]
    ],

    confirmPassword: [
      '',
      [Validators.required]
    ]

  });


  submitted = false;

  successMessage = '';

  errorMessage = '';

  isSubmitting = false;

  showCurrentPassword = false;

  showNewPassword = false;

  showConfirmPassword = false;

  onSubmit(): void {

    this.submitted = true;

    this.successMessage = '';

    this.errorMessage = '';


    if (this.changePasswordForm.invalid) {

      this.changePasswordForm.markAllAsTouched();

      return;

    }


    const newPassword =
      this.changePasswordForm.controls.newPassword.value!;

    const confirmPassword =
      this.changePasswordForm.controls.confirmPassword.value!;


    if (newPassword !== confirmPassword) {

      this.errorMessage =
        'New password and confirm password do not match.';

      return;

    }


    const request: ChangePasswordRequest = {

      currentPassword:
        this.changePasswordForm.controls.currentPassword.value!,

      newPassword: newPassword,

      confirmPassword: confirmPassword

    };


    this.isSubmitting = true;


    this.authService.changePassword(request)
      .subscribe({

        next: (response) => {

          this.isSubmitting = false;

          this.successMessage =
            response.message || 'Password changed successfully.';

          this.changePasswordForm.reset();

          this.submitted = false;

        },

        error: (error) => {

          this.isSubmitting = false;

          this.errorMessage =
            error?.error?.message ||
            'Unable to change password. Please check your current password and try again.';

        }

      });

  }


  cancel(): void {

    this.router.navigate(['/profile']);

  }

}