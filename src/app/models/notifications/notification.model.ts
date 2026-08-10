export type NotificationType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface NotificationModel {
  id: number;
  type: NotificationType;
  message: string;
  duration: number;
}