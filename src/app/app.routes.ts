import { Routes } from '@angular/router';
import { paymentsRoutes } from './payments/presentation/views/payments.routes';

export const routes: Routes = [
    {
        path: '',
        children: paymentsRoutes
    }
];
