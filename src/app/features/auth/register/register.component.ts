import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgOptimizedImage} from '@angular/common';
import {MatDivider} from "@angular/material/divider";
import {AuthService} from '../auth.service';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        MatDivider
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    registerForm: FormGroup;
    hidePassword = true;
    hideConfirmPassword: boolean = true;
    isLoading = false;
    public errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            role: ['', Validators.required],
            terms: [false, Validators.requiredTrue]
        });
    }

    togglePasswordVisibility(): void {
        this.hidePassword = !this.hidePassword;
    }

    toggleConfirmPasswordVisibility() {
        this.hideConfirmPassword = !this.hideConfirmPassword;
    }

    onSubmit(): void {
        this.errorMessage = null;
        if (this.registerForm.valid) {
            this.isLoading = true;
            const formData = this.registerForm.value;
            const {firstName, lastName, email, phone, password, role} = formData;
            // Combinar firstName y lastName en name y enviar solo los campos esperados
            const userData = {
                name: `${firstName} ${lastName}`.trim(),
                email,
                phone,
                password,
                role
            };
            this.authService.register(userData).subscribe({
                next: () => {
                    this.errorMessage = null;
                    this.router.navigate(['/auth/login']).then(() => {
                        this.isLoading = false;
                    });
                },
                error: (error) => {
                    // Si el backend envía un mensaje específico, mostrarlo
                    if (error.error && error.error.message) {
                        this.errorMessage = error.error.message;
                    } else if (error.status === 409) {
                        this.errorMessage = 'Este correo electrónico ya está en uso. Por favor, intenta con otro.';
                    } else if (error.status === 400) {
                        this.errorMessage = 'Datos inválidos o incompletos. Revisa los campos.';
                    } else {
                        this.errorMessage = 'Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.';
                    }
                    this.isLoading = false;
                }
            });
        }
    }
}
