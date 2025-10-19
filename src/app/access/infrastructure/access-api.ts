import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../domain/models/user.entity';
import { LoginCredentialsDto } from './login-response';
import { RegisterCredentialsDto } from './register-response';
import { LoginAssembler } from './login-assembler';
import { RegisterAssembler } from './register-assembler';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.dev';

/**
 * Servicio de API para operaciones de acceso/autenticación
 *
 * NOTA: Este servicio se mantiene por compatibilidad con tests existentes.
 * Para nuevas implementaciones, usar LoginApiEndpoint y RegisterApiEndpoint directamente.
 *
 * Este servicio NO hereda de BaseApiEndpointService porque las operaciones de login/register
 * no son operaciones CRUD estándar y tienen lógica de negocio específica.
 */
@Injectable({
  providedIn: 'root'
})
export class AccessManagementApiService {
  private readonly apiUrl = environment.apiBaseUrl;
  private readonly loginAssembler = inject(LoginAssembler);
  private readonly registerAssembler = inject(RegisterAssembler);

  constructor(private http: HttpClient) {}

  /**
   * Realiza el login del usuario simulado con json-server
   * Busca el usuario en la base de datos por email y password
   * @param credentials - Credenciales de acceso (email y password)
   * @returns Observable con la respuesta de login que incluye token y usuario
   */
  login(credentials: LoginCredentialsDto): Observable<{ accessToken: string; user: User }> {
    const params = new HttpParams()
      .set('email', credentials.email)
      .set('password', credentials.password);

    return this.http.get<any[]>(`${this.apiUrl}/users`, { params }).pipe(
      map(users => {
        if (!users || users.length === 0) {
          throw new Error('Credenciales inválidas');
        }

        const userData = users[0];

        // Validar que el usuario tenga todos los campos requeridos
        if (!userData.id || !userData.name || !userData.email || !userData.role) {
          throw new Error('Usuario incompleto en la base de datos');
        }

        // Simular un token de acceso
        const fakeToken = btoa(`${userData.email}:${Date.now()}`);

        return {
          accessToken: fakeToken,
          user: this.loginAssembler.toEntity(userData)
        };
      })
    );
  }

  /**
   * Realiza el logout del usuario (simulado para json-server)
   * Como json-server no puede manejar logout real, solo limpiamos el estado local
   * @returns Observable vacío
   */
  logout(): Observable<void> {
    return new Observable(observer => {
      observer.next();
      observer.complete();
    });
  }

  /**
   * Obtiene el perfil del usuario actual
   * @returns Observable con el usuario actual
   */
  getCurrentUser(): Observable<User> {
    // TODO: Implementar cuando el backend soporte este endpoint
    return new Observable(observer => {
      observer.error(new Error('getCurrentUser no implementado'));
    });
  }

  /**
   * Registra un nuevo usuario
   * @param credentials - Datos del nuevo usuario (name, email, password, role)
   * @returns Observable con el usuario creado y su token
   */
  register(credentials: RegisterCredentialsDto): Observable<{ accessToken: string; user: User }> {
    const newUser = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      role: credentials.role || 'user'
    };

    return this.http.post<any>(`${this.apiUrl}/users`, newUser).pipe(
      map(userData => {
        // Validar que el usuario se creó correctamente
        if (!userData.id || !userData.name || !userData.email || !userData.role) {
          throw new Error('Error al crear el usuario');
        }

        // Simular un token de acceso
        const fakeToken = btoa(`${userData.email}:${Date.now()}`);

        return {
          accessToken: fakeToken,
          user: this.registerAssembler.toEntity(userData)
        };
      })
    );
  }
}

