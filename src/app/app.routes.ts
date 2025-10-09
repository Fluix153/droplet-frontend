import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'alerts',
        loadChildren: () => import ('./features/alerts/alerts-module').then(m=>m.AlertsModule),
    },
    {
        path: '',
        redirectTo: '/alerts',
        pathMatch: 'full'
    }
];
