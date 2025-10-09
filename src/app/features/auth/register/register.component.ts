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


@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
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
        if (this.registerForm.valid) {
            this.isLoading = true;

            const formData = this.registerForm.value;
            // Remover campos que no necesita el backend
            const {confirmPassword, terms, ...userData} = formData;

            this.authService.register(userData).subscribe({
                next: (user) => {
                    console.log('Registro exitoso', user);
                    this.router.navigate(['/auth/login']);
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Error en el registro:', error);
                    this.isLoading = false;
                }
            });
        }
    }
}
