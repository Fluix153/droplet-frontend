import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {NgOptimizedImage, CommonModule} from '@angular/common';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        NgOptimizedImage
    ],
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
    forgotPasswordForm: FormGroup;
    isLoading = false;
    errorMessage: string | null = null;
    successMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.forgotPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit(): void {
        this.errorMessage = null;
        this.successMessage = null;

        if (this.forgotPasswordForm.valid) {
            this.isLoading = true;

            // Simulamos el envío de email de recuperación
            setTimeout(() => {
                this.successMessage = 'Se ha enviado un enlace de recuperación a tu correo electrónico.';
                this.isLoading = false;

                // Opcional: redirigir al login después de unos segundos
                setTimeout(() => {
                    this.router.navigate(['/auth/login']);
                }, 3000);
            }, 2000);
        }
    }

    goBackToLogin(): void {
        this.router.navigate(['/auth/login']);
    }
}
