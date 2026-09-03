import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CurrentUser } from '../../../models/auth/current-user';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})

export class Profile implements OnInit {

  private authService = inject(AuthService);
  
  currentUser: CurrentUser | null = null;
  loading = true;

  ngOnInit(): void {

    this.loadCurrentUser();

  }

  private loadCurrentUser(): void {

    this.authService.getCurrentUser().subscribe({

      next: (response) => {

          if (response.success && response.data) {

          this.currentUser = response.data;

        }

        this.loading = false;

               
      },


      error: () => {

        
        this.loading = false;

        }

    });

  }

}