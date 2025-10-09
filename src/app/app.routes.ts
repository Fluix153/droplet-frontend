import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';
import {roleGuard} from './core/guards/role.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth/login',
        loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'auth/register',
        loadComponent: () => import('./features/auth/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'auth/forgot-password',
        loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent)
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
