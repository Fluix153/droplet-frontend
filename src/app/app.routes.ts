import {Routes} from '@angular/router';
import {ACCESS_ROUTES} from './access/presentation/views/access.routes';
import {authGuard} from './access/infrastructure/guards/auth.guard';
import {roleGuard} from './access/infrastructure/guards/role.guard';
import { SUPPORT_ROUTES } from './support/presentation/views/support.routes';

export const routes: Routes = [
    {
        path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    {   path: 'auth', children: ACCESS_ROUTES },
    {
        path: 'dashboard',
        loadComponent: () => import('./shared/presentation/layouts/dashboard-layout/dashboard-layout.component').then(c => c.DashboardLayoutComponent),
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'household', pathMatch: 'full' },
            { path: 'admin', loadComponent: () => import('./shared/presentation/components/placeholder.component').then(c => c.PlaceholderComponent),
                canActivate: [roleGuard], data: { roles: ['ADMIN'] }},
            { path: 'brewmaster', loadComponent: () => import('./shared/presentation/components/placeholder.component').then(c => c.PlaceholderComponent),
                canActivate: [roleGuard], data: { roles: ['BREWMASTER'] }},
            { path: 'household', children: SUPPORT_ROUTES, canActivate: [roleGuard], data: { roles: ['HOUSEHOLD_HEAD'] }}
        ]
    }
];
