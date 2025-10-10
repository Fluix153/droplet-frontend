import { InjectionToken } from '@angular/core';
import { DashboardStore } from './dashboard.store';

export const DASHBOARD_STORE = new InjectionToken<DashboardStore>('DashboardStore');
