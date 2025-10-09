import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgOptimizedImage, CommonModule} from '@angular/common';
import {AuthService} from '../auth.service';
import {TokenService} from '../../../core/services/token.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule,
        MatProgressSpinnerModule,
        NgOptimizedImage
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;
    hidePassword = true;
    isLoading = false;
    public errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private tokenService: TokenService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: [''],
            password: [''],
            remember: [false]
        });
    }

    togglePasswordVisibility(): void {
        this.hidePassword = !this.hidePassword;
    }

    onSubmit(event: Event): void {
        event.preventDefault();
        this.errorMessage = null;
        if (this.loginForm.valid) {
            this.isLoading = true;
            const {email, password, remember} = this.loginForm.value;
            this.authService.login({email, password}).subscribe({
                next: (response) => {
                    this.tokenService.set(response.accessToken, remember);
                    this.authService.setCurrentUser(response.user);
                    this.redirectBasedOnRole(response.user.role);
                    this.isLoading = false;
                    this.errorMessage = null;
                },
                error: (error) => {
                    // Mejor manejo de errores: mostrar mensaje del backend si existe
                    if (error.error && error.error.message) {
                        this.errorMessage = error.error.message;
                    } else if (error.status === 401 || error.status === 400) {
                        this.errorMessage = 'El correo o la contraseña son incorrectos.';
                    } else {
                        this.errorMessage = 'Ocurrió un error inesperado.';
                    }
                    this.isLoading = false;
                }
            });
        }
    }

    private redirectBasedOnRole(role: string): void {
        switch (role) {
            case 'ADMIN':
                this.router.navigate(['/dashboard/admin']);
                break;
            case 'BREWMASTER':
                this.router.navigate(['/dashboard/brewmaster']);
                break;
            case 'HOUSEHOLD_HEAD':
                this.router.navigate(['/dashboard/household']);
                break;
            default:
                this.router.navigate(['/dashboard/household']);
                break;
        }
    }
}
