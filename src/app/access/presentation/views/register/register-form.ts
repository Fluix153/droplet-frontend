import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil, Observable } from 'rxjs'
import { NgOptimizedImage } from '@angular/common';

import { AccessStore } from '../../../application/access.store';
import { User } from '../../../domain/models/user.entity';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
      NgOptimizedImage,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.css']
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly store = inject(AccessStore);

  // Subject para manejo de subscripciones
  private readonly destroy$ = new Subject<void>();

  registerForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  // Estado expuesto directamente desde el store
  public readonly currentUser$: Observable<User | null> = this.store.currentUser$;
  public readonly isLoading$: Observable<boolean> = this.store.isLoading$;
  public readonly error$: Observable<string | null> = this.store.error$;

  ngOnInit(): void {
    this.createForm();
    this.setupUserRedirection();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  /**
   * Configura la redirección automática cuando el usuario se registra exitosamente
   */
  private setupUserRedirection(): void {
    this.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          console.log('Usuario registrado y logueado exitosamente:', user);
          this.redirectBasedOnRole(user);
        }
      });
  }

  /**
   * Redirige al usuario según su rol
   */
  private redirectBasedOnRole(user: User): void {
    const role = user.role?.toUpperCase();

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

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (confirmPassword?.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }

    return null;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const formData = this.registerForm.value;
    const credentials = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    console.log('Iniciando registro con credenciales:', credentials);

    // El store maneja el registro y actualiza el estado automáticamente
    this.store.register(credentials);
  }

  /**
   * Limpia el error delegando al store
   */
  clearError(): void {
    this.store.clearError();
  }

  /**
   * Marca todos los campos del formulario como tocados para mostrar errores
   */
  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Helpers para el template - verificación de errores
   */
  hasFieldError(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  getFieldErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (!field?.errors || !field?.touched) return '';

    if (field.errors['required']) {
      return `${fieldName} es requerido`;
    }
    if (field.errors['email']) {
      return 'Email inválido';
    }
    if (field.errors['minlength']) {
      return `${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
    }
    if (field.errors['pattern']) {
      return 'Formato inválido';
    }
    if (field.errors['passwordMismatch']) {
      return 'Las contraseñas no coinciden';
    }

    return 'Campo inválido';
  }
}
