import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, catchError, of, tap, filter, take } from 'rxjs';
import { SupportTicket } from '../domain/models/support.entity';
import { SupportApiService } from '../infrastructure/support-api';
import { AccessStore } from '../../access/application/access.store';
import { CreateTicketDto } from '../infrastructure/support-response';
import { User } from '../../access/domain/models/user.entity';

/**
 * Interface que define el estado del módulo de soporte
 */
export interface SupportState {
  tickets: SupportTicket[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Estado inicial del store
 */
const initialState: SupportState = {
  tickets: [],
  isLoading: false,
  error: null
};

/**
 * Store que maneja el estado global del módulo de soporte
 * Implementa el patrón de gestión de estado con BehaviorSubject
 */
@Injectable({
  providedIn: 'root'
})
export class SupportStore {
  private readonly supportApiService = inject(SupportApiService);
  private readonly accessStore = inject(AccessStore);

  // Estado privado gestionado por BehaviorSubject
  private readonly state = new BehaviorSubject<SupportState>(initialState);

  // Observables públicos para exponer el estado
  public readonly tickets$: Observable<SupportTicket[]> = this.state.asObservable().pipe(
    map(state => state.tickets)
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
  public readonly state$: Observable<SupportState> = this.state.asObservable();

  /**
   * Carga los tickets del usuario actual desde el API
   */
  loadTickets(): void {
    // 1. Actualizar el estado para indicar que la carga ha comenzado
    this.updateState({ isLoading: true, error: null });

    // 2. Obtener el usuario actual del AccessStore y hacer la petición
    this.accessStore.currentUser$.pipe(
      filter((currentUser): currentUser is User => !!currentUser),
      take(1),
      switchMap(currentUser => this.supportApiService.getTicketsByUserId(currentUser.id)),
      catchError(error => {
        const errorMessage = error?.error?.message || error?.message || 'Error al cargar los tickets';
        this.updateState({
          isLoading: false,
          error: errorMessage,
          tickets: []
        });
        return of([]);
      })
    ).subscribe({
      next: (tickets) => {
        // 3. Si la llamada es exitosa, actualizar el estado con los tickets
        this.updateState({
          tickets,
          isLoading: false,
          error: null
        });
      }
    });
  }

  /**
   * Crea un nuevo ticket de soporte
   * @param ticketData - Datos del formulario para crear el ticket
   */
  createTicket(ticketData: Omit<CreateTicketDto, 'userId'>): void {
    // 1. Actualizar el estado para indicar que la operación ha comenzado
    this.updateState({ isLoading: true, error: null });

    // 2. Obtener el usuario actual y crear el ticket
    this.accessStore.currentUser$.pipe(
      filter((currentUser): currentUser is User => !!currentUser),
      take(1),
      switchMap(currentUser => {
        const createTicketDto: CreateTicketDto = {
          ...ticketData,
          userId: currentUser.id
        };

        return this.supportApiService.createTicket(createTicketDto);
      }),
      tap(() => {
        // 3. Después de crear el ticket exitosamente, recargar la lista
        this.loadTickets();
      }),
      catchError(error => {
        const errorMessage = error?.error?.message || error?.message || 'Error al crear el ticket';
        this.updateState({
          isLoading: false,
          error: errorMessage
        });
        return of(null);
      })
    ).subscribe({
      next: (createdTicket) => {
        if (createdTicket) {
          // El loadTickets() ya se ejecutó en el tap, solo necesitamos limpiar el loading
          this.updateState({ isLoading: false });
        }
      }
    });
  }

  /**
   * Método privado para actualizar el estado
   * @param partialState - Estado parcial a actualizar
   */
  private updateState(partialState: Partial<SupportState>): void {
    const currentState = this.state.value;
    const newState = { ...currentState, ...partialState };
    this.state.next(newState);
  }

  /**
   * Limpia el error del estado
   */
  clearError(): void {
    this.updateState({ error: null });
  }

  /**
   * Reinicia el estado a su valor inicial
   */
  reset(): void {
    this.state.next(initialState);
  }
}
