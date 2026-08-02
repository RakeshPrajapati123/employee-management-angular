import { Component, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule , FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
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

  onSubmit() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();
      return;

    }

    const loginRequest = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };


    this.authService.login(loginRequest)
      .subscribe({
        next: (response) => {

          console.log('Login Successful');
          console.log(response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);

          this.router.navigate(['/dashboard']);

        },

        error: (error) => {

          console.log('Login Failed');
          console.log(error);

        }
      });

  }
  
  }


