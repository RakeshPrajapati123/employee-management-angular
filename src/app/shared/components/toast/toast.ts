import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})

export class Toast {

  private notificationService = inject(NotificationService);

  notifications = this.notificationService.notifications;

}
