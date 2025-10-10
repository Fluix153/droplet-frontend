import { Route } from '@angular/router';
import { DashboardView } from './presentation/views/dashboard/dashboard';

export const dashboardRoutes: Route[] = [
    {
        path: '',
        component: DashboardView
    }
];
