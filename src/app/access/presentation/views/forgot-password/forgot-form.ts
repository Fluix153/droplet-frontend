import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Componente visual para recuperación de contraseña
 * Enfoque simple y funcional sin arquitectura DDD compleja
 */
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
        NgOptimizedImage,
        TranslatePipe
    ],
    templateUrl: './forgot-form.html',
    styleUrls: ['./forgot-form.css']
})
export class ForgotPasswordComponent implements OnInit {
    // Inyección de dependencias básicas
    private readonly formBuilder = inject(FormBuilder);
    private readonly router = inject(Router);

    // Formulario reactivo
    forgotPasswordForm!: FormGroup;

    // Estados de UI
    isLoading = false;
    errorMessage: string | null = null;
    successMessage: string | null = null;

    ngOnInit(): void {
        this.initializeForm();
    }

    /**
     * Inicializa el formulario reactivo con validaciones básicas
     */
    private initializeForm(): void {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    /**
     * Maneja el envío del formulario
     */
    onSubmit(): void {
        // Limpiar mensajes previos
        this.clearMessages();

        // Validar formulario
        if (this.forgotPasswordForm.invalid) {
            this.markFormGroupTouched();
            return;
        }

        // Extraer email del formulario
        const email = this.forgotPasswordForm.get('email')?.value;

        // Validación básica adicional
        if (!this.isValidEmail(email)) {
            this.errorMessage = 'Por favor, ingresa un email válido';
            return;
        }

        // Simular el proceso
        this.simulateForgotPasswordProcess(email);
    }

    /**
     * Simula el proceso de recuperación de contraseña
     */
    private simulateForgotPasswordProcess(email: string): void {
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

    /**
     * Redirige de vuelta al login
     */
    goBackToLogin(): void {
        this.router.navigate(['/auth/login']);
    }

    /**
     * Limpia todos los mensajes de error y éxito
     */
    private clearMessages(): void {
        this.errorMessage = null;
        this.successMessage = null;
    }

    /**
     * Marca todos los campos del formulario como tocados para mostrar errores
     */
    private markFormGroupTouched(): void {
        Object.keys(this.forgotPasswordForm.controls).forEach(key => {
            const control = this.forgotPasswordForm.get(key);
            control?.markAsTouched();
        });
    }

    /**
     * Validación adicional de email
     */
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
