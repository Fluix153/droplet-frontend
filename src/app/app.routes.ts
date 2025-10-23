import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full',},
  { path: 'auth', loadChildren: () => import('./access/presentation/views/access.routes').then(m => m.ACCESS_ROUTES),},
  { path: 'dashboard', loadComponent: () => import('./shared/presentation/layouts/app-layout/app-layout').then(c => c.AppLayoutComponent), title: 'Dashboard',
    children: [
      { path: '', redirectTo: 'household', pathMatch: 'full', },
      { path: 'household', loadChildren: () => import('./support/presentation/views/support.routes').then(m => m.SUPPORT_ROUTES),
        title: 'Household'},
      { path: 'admin', loadComponent: () => import('./shared/presentation/components/placeholder.component').then(c => c.PlaceholderComponent),
        title: 'Admin'},
      { path: 'brewmaster', loadComponent: () => import('./shared/presentation/components/placeholder.component').then(c => c.PlaceholderComponent),
        title: 'Brewmaster'}
    ],
  },
  { path: '**', loadComponent: () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound),
    title: 'Page Not Found',
  },
];
