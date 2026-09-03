import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);


  loginForm = this.fb.group({

    email: ['', [Validators.required, Validators.email]],

    password: ['', Validators.required]

  });


  onSubmit(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }


    const loginRequest = {

      email: this.loginForm.value.email!,

      password: this.loginForm.value.password!

    };


    this.authService.login(loginRequest).subscribe({

      next: (response) => {

        // Store authentication tokens

        localStorage.setItem(
          'token',
          response.data.token
        );

        localStorage.setItem(
          'refreshToken',
          response.data.refreshToken
        );


        // Get current logged-in user

        this.authService.getCurrentUser().subscribe({

          next: (userResponse) => {

            if (
              userResponse.success &&
              userResponse.data
            ) {

              localStorage.setItem(
                'currentUser',
                JSON.stringify(userResponse.data)
              );

            }


            // Navigate after current user is loaded

            this.router.navigate(['/dashboard']);

          },


          error: (error) => {

            this.router.navigate(['/dashboard']);

          }

        });

      },


      error: (error) => {

        
      }

    });

  }

}