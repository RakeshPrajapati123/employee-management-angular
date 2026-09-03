import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})

export class Toast {

  private readonly notificationService = inject(NotificationService);

  notifications = this.notificationService.notifications;

}
