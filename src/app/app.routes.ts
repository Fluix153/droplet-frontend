import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.dashboardRoutes)
    }
];
