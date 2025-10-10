import { Routes } from '@angular/router';
import { SupportCardComponent } from './support-card/support-card';

export const SUPPORT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./support-card/support-card').then(m => m.SupportCardComponent)
  }
];

