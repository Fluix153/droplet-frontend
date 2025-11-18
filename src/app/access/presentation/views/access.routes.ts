// access.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login-form';
import { AuthLayoutComponent } from '../../../shared/presentation/layouts/auth-layout/auth-layout.component';

export const ACCESS_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', loadComponent: () => import('./register/register-form').then(m => m.RegisterFormComponent) },
      { path: 'forgot-password', loadComponent: () => import('./forgot-password/forgot-form').then(m => m.ForgotPasswordComponent) },
    ],
  },
];
