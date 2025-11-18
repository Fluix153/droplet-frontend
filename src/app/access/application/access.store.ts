import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../domain/models/user.entity';
import { LoginApiEndpoint } from '../infrastructure/login-api-endpoint';
import { RegisterApiEndpoint } from '../infrastructure/register-api-endpoint';
import { TokenService } from '../infrastructure/services/token.service';
import { CurrentUserApiEndpoint } from '../infrastructure/current-user-api-endpoint';

/**
 * Interface que define el estado del módulo de acceso
 */
export interface AccessState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Estado inicial del store
 */
const initialState: AccessState = {
  currentUser: null,
  isLoading: false,
  error: null
};

/**
 * Store que maneja el estado global del módulo de acceso
 * Implementa el patrón de gestión de estado con BehaviorSubject
 */
@Injectable({
  providedIn: 'root'
})
export class AccessStore {
  private readonly loginApiEndpoint = inject(LoginApiEndpoint);
  private readonly registerApiEndpoint = inject(RegisterApiEndpoint);
  private readonly currentUserApiEndpoint = inject(CurrentUserApiEndpoint);
  private readonly tokenService = inject(TokenService);

  constructor() {
    if (this.tokenService.isAuthenticated()) {
      this.loadCurrentUser();
    }
  }

  // Estado privado gestionado por BehaviorSubject
  private readonly state = new BehaviorSubject<AccessState>(initialState);

  // Observables públicos para exponer el estado
  public readonly currentUser$: Observable<User | null> = this.state.asObservable().pipe(
    map(state => state.currentUser)
  );

  public readonly isLoading$: Observable<boolean> = this.state.asObservable().pipe(
    map(state => state.isLoading)
  );

  public readonly error$: Observable<string | null> = this.state.asObservable().pipe(
    map(state => state.error)
  );

  /**
   * Obtiene el estado actual completo
   */
  public readonly state$: Observable<AccessState> = this.state.asObservable();

  /**
   * Implementa el caso de uso de login
   * @param credentials - Credenciales de acceso (email y password)
   */
  login(credentials: { email: string; password: string }): void {
    // 1. Actualizar el estado para indicar que la carga ha comenzado
    this.updateState({ isLoading: true, error: null });

    this.loginApiEndpoint.login(credentials).subscribe({
      next: (response) => {
        // 3. Si la llamada es exitosa:
        // - Guardar el accessToken usando el TokenService
        this.tokenService.set(response.accessToken, true); // remember = true por defecto

        // - Actualizar el estado con el nuevo currentUser y pon isLoading en false
        this.updateState({
          currentUser: response.user,
          isLoading: false,
          error: null
        });
      },
      error: (error) => {
        // 4. Si la llamada falla:
        // - Actualizar el estado con un error y pon isLoading en false
        const errorMessage = error?.error?.message || error?.message || 'Error durante el login';
        this.updateState({
          currentUser: null,
          isLoading: false,
          error: errorMessage
        });
      }
    });
  }

  /**
   * Implementa el caso de uso de logout
   */
  logout(): void {
    this.updateState({ isLoading: true, error: null });

    this.loginApiEndpoint.logout().subscribe({
      next: () => {
        // Limpiar el token del almacenamiento
        this.tokenService.clear();

        // Resetear el estado al estado inicial
        this.updateState({
          currentUser: null,
          isLoading: false,
          error: null
        });
      },
      error: (error) => {
        // Incluso si falla el logout en el servidor, limpiamos localmente
        this.tokenService.clear();
        const errorMessage = error?.error?.message || 'Error durante el logout';
        this.updateState({
          currentUser: null,
          isLoading: false,
          error: errorMessage
        });
      }
    });
  }

  /**
   * Carga el usuario actual desde el servidor
   */
  loadCurrentUser(): void {
    if (!this.tokenService.isAuthenticated()) {
      return;
    }

    this.updateState({ isLoading: true, error: null });

    const token = this.tokenService.get();
    const email = token ? this.extractEmailFromToken(token) : null;

    if (!email) {
      this.tokenService.clear();
      this.updateState({
        currentUser: null,
        isLoading: false,
        error: 'Token inválido'
      });
      return;
    }

    this.currentUserApiEndpoint.getByEmail(email).subscribe({
      next: (user) => {
        this.updateState({
          currentUser: user,
          isLoading: false,
          error: null
        });
      },
      error: (error) => {
        const errorMessage = error?.message || 'No se pudo cargar el usuario';
        if (errorMessage === 'Usuario no encontrado') {
          this.tokenService.clear();
        }

        this.updateState({
          currentUser: null,
          isLoading: false,
          error: errorMessage
        });
      }
    });
  }

  /**
   * Implementa el caso de uso de registro
   * @param credentials - Datos del nuevo usuario (name, email, password, role)
   */
  register(credentials: { name: string; email: string; password: string; role?: string }): void {
    // 1. Actualizar el estado para indicar que la carga ha comenzado
    this.updateState({ isLoading: true, error: null });

    this.registerApiEndpoint.register(credentials).subscribe({
      next: (response) => {
        // 2. Si el registro es exitoso:
        // - Guardar el token
        this.tokenService.set(response.accessToken, true);

        // - Actualizar el estado con el nuevo usuario registrado
        this.updateState({
          currentUser: response.user,
          isLoading: false,
          error: null
        });
      },
      error: (error) => {
        // 3. Si el registro falla:
        // - Actualizar el estado con un error y pon isLoading en false
        const errorMessage = error?.error?.message || error?.message || 'Error durante el registro';
        this.updateState({
          currentUser: null,
          isLoading: false,
          error: errorMessage
        });
      }
    });
  }

  /**
   * Limpia el error del estado
   */
  clearError(): void {
    this.updateState({ error: null });
  }


  private updateState(partial: Partial<AccessState>): void {
    const currentState = this.state.value;
    const newState = { ...currentState, ...partial };
    this.state.next(newState);
  }

  private extractEmailFromToken(token: string): string | null {
    try {
      const decoded = atob(token);
      const [email] = decoded.split(':');
      return email?.trim() || null;
    } catch {
      return null;
    }
  }

  /**
   * Obtiene el valor actual del estado (para uso sincrónico)
   */
  getCurrentState(): AccessState {
    return this.state.value;
  }
}
