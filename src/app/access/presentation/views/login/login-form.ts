import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil, Observable } from 'rxjs';

import { AccessStore } from '../../../application/access.store';
import { User } from '../../../domain/models/user.entity';

/**
 * Componente de presentación para el formulario de login
 * Responsabilidad única: pintar la vista y delegar acciones al AccessStore
 */
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule
  ],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  // Inyección de dependencias - solo lo esencial para presentación
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly store = inject(AccessStore);

  // Subject para manejo de subscripciones
  private readonly destroy$ = new Subject<void>();

  // Formulario reactivo
  loginForm!: FormGroup;

  // Propiedades de UI
  hidePassword = true;

  // Estado expuesto directamente desde el store
  public readonly currentUser$: Observable<User | null> = this.store.currentUser$;
  public readonly isLoading$: Observable<boolean> = this.store.isLoading$;
  public readonly error$: Observable<string | null> = this.store.error$;

  ngOnInit(): void {
    this.initializeForm();
    this.handleUserRedirection();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Inicializa el formulario reactivo con validaciones básicas
   */
  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Maneja la redirección cuando el usuario se loguea exitosamente
   */
  private handleUserRedirection(): void {
    this.store.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
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

  /**
   * Maneja el envío del formulario - delegando toda la lógica al store
   */
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    // Extraer credenciales y delegar al store
    const credentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.store.login(credentials);
  }

  /**
   * Alterna la visibilidad de la contraseña
   */
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
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
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Helpers para el template - verificación de errores
   */
  hasFieldError(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  getFieldErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field?.errors || !field?.touched) return '';

    if (field.errors['required']) {
      return `${fieldName} es requerido`;
    }
    if (field.errors['email']) {
      return 'Email inválido';
    }

    return 'Campo inválido';
  }
}
