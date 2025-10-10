import {Routes} from '@angular/router';
import {authGuard} from './access/infrastructure/guards/auth.guard';
import {roleGuard} from './access/infrastructure/guards/role.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./access/presentation/views/access.routes').then(r => r.ACCESS_ROUTES)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./shared/layouts/dashboard-layout/dashboard-layout.component').then(c => c.DashboardLayoutComponent),
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'household',
                pathMatch: 'full'
            },
            {
                path: 'admin',
                loadComponent: () => import('./shared/components/placeholder.component').then(c => c.PlaceholderComponent),
                canActivate: [roleGuard],
                data: {title: 'Bienvenido Admin', role: 'administrador', roles: ['ADMIN']}
            },
            {
                path: 'brewmaster',
                loadComponent: () => import('./shared/components/placeholder.component').then(c => c.PlaceholderComponent),
                canActivate: [roleGuard],
                data: {title: 'Bienvenido Brewmaster', role: 'maestro cervecero', roles: ['BREWMASTER']}
            },
            {
                path: 'household',
                loadComponent: () => import('./shared/components/placeholder.component').then(c => c.PlaceholderComponent),
                canActivate: [roleGuard],
                data: {title: 'Bienvenido Usuario', role: 'jefe de hogar', roles: ['HOUSEHOLD_HEAD']}
            }
        ]
    }
];
