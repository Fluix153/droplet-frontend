import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';

import { LoginComponent } from './login-form';
import { AccessStore } from '../../../application/access.store';
import { User } from '../../../domain/models/user.entity';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAccessStore: jasmine.SpyObj<AccessStore>;
  let mockRouter: jasmine.SpyObj<Router>;

  // BehaviorSubjects para simular los observables del store
  let currentUserSubject: BehaviorSubject<User | null>;
  let isLoadingSubject: BehaviorSubject<boolean>;
  let errorSubject: BehaviorSubject<string | null>;

  beforeEach(async () => {
    // Inicializar BehaviorSubjects
    currentUserSubject = new BehaviorSubject<User | null>(null);
    isLoadingSubject = new BehaviorSubject<boolean>(false);
    errorSubject = new BehaviorSubject<string | null>(null);

    // Crear mocks
    mockAccessStore = jasmine.createSpyObj('AccessStore', ['login', 'clearError'], {
      currentUser$: currentUserSubject.asObservable(),
      isLoading$: isLoadingSubject.asObservable(),
      error$: errorSubject.asObservable()
    });

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AccessStore, useValue: mockAccessStore },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Limpiar subjects
    currentUserSubject.complete();
    isLoadingSubject.complete();
    errorSubject.complete();
  });

  describe('Inicialización del componente', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form with email and password fields', () => {
      expect(component.loginForm).toBeDefined();
      expect(component.loginForm.get('email')).toBeDefined();
      expect(component.loginForm.get('password')).toBeDefined();
    });

    it('should expose store observables directly', () => {
      expect(component.currentUser$).toBeDefined();
      expect(component.isLoading$).toBeDefined();
      expect(component.error$).toBeDefined();
    });

    it('should set form fields as required', () => {
      const emailControl = component.loginForm.get('email');
      const passwordControl = component.loginForm.get('password');

      expect(emailControl?.hasError('required')).toBeTruthy();
      expect(passwordControl?.hasError('required')).toBeTruthy();
    });
  });

  describe('Form validation', () => {
    it('should validate email format', () => {
      const emailControl = component.loginForm.get('email');

      emailControl?.setValue('invalid-email');
      expect(emailControl?.hasError('email')).toBeTruthy();

      emailControl?.setValue('valid@email.com');
      expect(emailControl?.hasError('email')).toBeFalsy();
    });

    it('should not submit invalid form', () => {
      component.onSubmit();

      expect(mockAccessStore.login).not.toHaveBeenCalled();
    });

    it('should mark form as touched when invalid submission attempted', () => {
      component.onSubmit();

      expect(component.loginForm.get('email')?.touched).toBeTruthy();
      expect(component.loginForm.get('password')?.touched).toBeTruthy();
    });
  });

  describe('Form submission - DDD delegation', () => {
    beforeEach(() => {
      // Configurar formulario válido
      component.loginForm.patchValue({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('should delegate login to AccessStore when form is valid', () => {
      component.onSubmit();

      expect(mockAccessStore.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('should not contain business logic in component', () => {
      component.onSubmit();

      // Verificar que el componente no maneja tokens, no hace llamadas HTTP, etc.
      // Solo delega al store
      expect(mockAccessStore.login).toHaveBeenCalledTimes(1);
    });
  });

  describe('User redirection based on role', () => {
    it('should redirect ADMIN users to admin dashboard', () => {
      const adminUser = new User('1', 'admin@test.com', 'Admin User', 'ADMIN');

      currentUserSubject.next(adminUser);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/admin']);
    });

    it('should redirect BREWMASTER users to brewmaster dashboard', () => {
      const brewmasterUser = new User('1', 'brewmaster@test.com', 'Brewmaster User', 'BREWMASTER');

      currentUserSubject.next(brewmasterUser);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/brewmaster']);
    });

    it('should redirect HOUSEHOLD_HEAD users to household dashboard', () => {
      const householdUser = new User('1', 'household@test.com', 'Household User', 'HOUSEHOLD_HEAD');

      currentUserSubject.next(householdUser);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/household']);
    });

    it('should redirect users with unknown roles to default household dashboard', () => {
      const unknownRoleUser = new User('1', 'user@test.com', 'Unknown User', 'UNKNOWN_ROLE');

      currentUserSubject.next(unknownRoleUser);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/household']);
    });

    it('should redirect users with no role to default household dashboard', () => {
      const noRoleUser = new User('1', 'user@test.com', 'No Role User');

      currentUserSubject.next(noRoleUser);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/household']);
    });

    it('should handle case-insensitive role comparison', () => {
      const lowerCaseAdminUser = new User('1', 'admin@test.com', 'Admin User', 'admin');

      currentUserSubject.next(lowerCaseAdminUser);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/admin']);
    });

    it('should not redirect when user is null', () => {
      currentUserSubject.next(null);

      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  describe('Store state integration', () => {
    it('should react to loading state changes', () => {
      isLoadingSubject.next(true);
      fixture.detectChanges();

      // Verificar que el componente reacciona al estado de carga
      component.isLoading$.subscribe(isLoading => {
        expect(isLoading).toBeTruthy();
      });
    });

    it('should react to error state changes', () => {
      const errorMessage = 'Login failed';
      errorSubject.next(errorMessage);
      fixture.detectChanges();

      component.error$.subscribe(error => {
        expect(error).toBe(errorMessage);
      });
    });

    it('should delegate error clearing to store', () => {
      component.clearError();

      expect(mockAccessStore.clearError).toHaveBeenCalled();
    });
  });

  describe('UI interactions', () => {
    it('should toggle password visibility', () => {
      expect(component.hidePassword).toBeTruthy();

      component.togglePasswordVisibility();

      expect(component.hidePassword).toBeFalsy();
    });

    it('should provide field error helpers', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.markAsTouched();
      emailControl?.setValue('');

      expect(component.hasFieldError('email')).toBeTruthy();
      expect(component.getFieldErrorMessage('email')).toContain('requerido');
    });
  });

  describe('Component lifecycle', () => {
    it('should initialize form and subscriptions on ngOnInit', () => {
      spyOn(component as any, 'initializeForm');
      spyOn(component as any, 'handleUserRedirection');

      component.ngOnInit();

      expect((component as any).initializeForm).toHaveBeenCalled();
      expect((component as any).handleUserRedirection).toHaveBeenCalled();
    });

    it('should clean up subscriptions on ngOnDestroy', () => {
      const destroySpy = spyOn((component as any).destroy$, 'next');
      const completeSpy = spyOn((component as any).destroy$, 'complete');

      component.ngOnDestroy();

      expect(destroySpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('DDD Architecture compliance', () => {
    it('should only inject presentation-layer dependencies', () => {
      // Verificar que no se inyectan servicios de infraestructura directamente
      // Solo FormBuilder, Router y AccessStore (facade)
      expect(component['formBuilder']).toBeDefined();
      expect(component['router']).toBeDefined();
      expect(component['store']).toBeDefined();
    });

    it('should expose store state without transformation', () => {
      // Verificar que los observables son exposiciones directas del store
      expect(component.currentUser$).toBe(mockAccessStore.currentUser$);
      expect(component.isLoading$).toBe(mockAccessStore.isLoading$);
      expect(component.error$).toBe(mockAccessStore.error$);
    });

    it('should not contain business logic', () => {
      // Verificar que onSubmit solo valida y delega
      component.loginForm.patchValue({
        email: 'test@example.com',
        password: 'password123'
      });

      component.onSubmit();

      expect(mockAccessStore.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });
});
