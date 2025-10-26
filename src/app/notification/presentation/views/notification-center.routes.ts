import { Routes } from '@angular/router';

export const NOTIFICATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./notification-center/notification-center').then(m => m.NotificationCenterComponent),
    title: 'Notifications'
  }
];
