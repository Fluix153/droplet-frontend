import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full',},
  { path: 'auth', loadChildren: () => import('./access/presentation/views/access.routes').then(m => m.ACCESS_ROUTES),},
  { path: 'dashboard', loadComponent: () => import('./shared/presentation/layouts/app-layout/app-layout').then(c => c.AppLayoutComponent), title: 'Dashboard',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full', },
      { path: 'home', loadChildren: () => import('./dashboard/presentation/views/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
        title: 'Dashboard Home'},
      { path: 'notifications', loadChildren: () => import('./notification/presentation/views/notification-center.routes').then(m => m.NOTIFICATION_ROUTES),
        title: 'Notifications' },
      { path: 'support', loadChildren: () => import('./support/presentation/views/support.routes').then(m => m.SUPPORT_ROUTES),
        title: 'Support'},
    ],
  },
  { path: '**', loadComponent: () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound),
    title: 'Page Not Found',
  },
];
