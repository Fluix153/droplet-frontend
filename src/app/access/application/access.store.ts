import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../domain/models/user.entity';
import { AccessManagementApiService } from '../infrastructure/access-api';
import { TokenService } from '../infrastructure/services/token.service';

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
  private readonly accessApiService = inject(AccessManagementApiService);
  private readonly tokenService = inject(TokenService);

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

    this.accessApiService.login(credentials).subscribe({
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

    this.accessApiService.logout().subscribe({
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

    this.accessApiService.getCurrentUser().subscribe({
      next: (user) => {
        this.updateState({
          currentUser: user,
          isLoading: false,
          error: null
        });
      },
      error: (error) => {
        // Si falla cargar el usuario, probablemente el token es inválido
        this.tokenService.clear();
        const errorMessage = error?.error?.message || 'Error al cargar el usuario';
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

  /**
   * Obtiene el valor actual del estado (para uso sincrónico)
   */
  getCurrentState(): AccessState {
    return this.state.value;
  }
}
