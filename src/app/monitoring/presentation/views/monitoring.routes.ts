import { Routes } from '@angular/router';

const monitoring = () =>
  import('./monitoring/monitoring').then(m => m.Monitoring);

const sensorEdit = () =>
  import('./sensor-edit/sensor-edit').then(m => m.SensorEdit);

export const MONITORING_ROUTES: Routes = [
  { path: '', redirectTo: 'sensors', pathMatch: 'full' },
  { path: 'sensors', loadComponent: monitoring },
  { path: 'sensors/edit/:id', loadComponent: sensorEdit }
];
