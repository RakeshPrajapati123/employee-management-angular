import { Injectable, signal } from '@angular/core';
import { NotificationModel,  NotificationType} from '../../models/notifications/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationList = signal<NotificationModel[]>([]);

  readonly notifications = this.notificationList.asReadonly();

  private nextId = 1;

  success(message: string, duration: number = 4000): void {
    this.show('success', message, duration);
  }

  error(message: string, duration: number = 5000): void {
    this.show('error', message, duration);
  }

  warning(message: string, duration: number = 5000): void {
    this.show('warning', message, duration);
  }

  info(message: string, duration: number = 4000): void {
    this.show('info', message, duration);
  }

  private show(
    type: NotificationType,
    message: string,
    duration: number
  ): void {

    const notification: NotificationModel = {
      id: this.nextId++,
      type,
      message,
      duration
    };

    this.notificationList.update(
      current => [...current, notification]
    );

    setTimeout(() => {
      this.remove(notification.id);
    }, duration);
  }

  private remove(id: number): void {

    this.notificationList.update(
      current => current.filter(
        notification => notification.id !== id
      )
    );

  }

}