import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiEndpointService } from '../../shared/infrastructure/base-api-endpoint.service';
import { User } from '../domain/models/user.entity';
import { LoginResponseDto, LoginCredentialsDto } from './login-response';
import { RegisterResponseDto, RegisterCredentialsDto } from './register-response';
import { LoginAssembler } from './login-assembler';
import { RegisterAssembler } from './register-assembler';
import { HttpParams } from '@angular/common/http';

/**
 * Servicio de API para operaciones de acceso/autenticación
 * Implementa la capa de infraestructura heredando de BaseApiEndpointService
 */
@Injectable({
  providedIn: 'root'
})
export class AccessManagementApiService extends BaseApiEndpointService {
  private readonly loginAssembler = inject(LoginAssembler);
  private readonly registerAssembler = inject(RegisterAssembler);

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

    return this._get<any[]>('users', params).pipe(
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
    return this._get<LoginResponseDto['user']>('auth/profile').pipe(
      map(userDto => this.loginAssembler.toEntity(userDto))
    );
  }

  /**
   * Verifica si el token actual es válido
   * @returns Observable con el resultado de la verificación
   */
  verifyToken(): Observable<boolean> {
    return this._get<{ valid: boolean }>('auth/verify').pipe(
      map(response => response.valid)
    );
  }

  /**
   * Refresca el token de acceso
   * @returns Observable con el nuevo token
   */
  refreshToken(): Observable<{ accessToken: string }> {
    return this._post<{ accessToken: string }>('auth/refresh', {});
  }

  /**
   * Registra un nuevo usuario
   * @param credentials - Datos del nuevo usuario (name, email, password, role, phone)
   * @returns Observable con el usuario creado
   */
  register(credentials: RegisterCredentialsDto): Observable<User> {
    return this._post<RegisterResponseDto>('users', credentials).pipe(
      map(response => this.registerAssembler.toEntity(response))
    );
  }
}
