// access.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login-form';
// import { RegisterComponent } from './register/register.component';

export const ACCESS_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent }
];