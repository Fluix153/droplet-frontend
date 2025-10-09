import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiEndpointService } from '../../shared/infrastructure/base-api-endpoint.service';
import { User } from '../domain/models/user.entity';
import { LoginResponseDto, LoginCredentialsDto } from './login-response';
import { LoginAssembler } from './login-assembler';

/**
 * Servicio de API para operaciones de acceso/autenticación
 * Implementa la capa de infraestructura heredando de BaseApiEndpointService
 */
@Injectable({
  providedIn: 'root'
})
export class AccessManagementApiService extends BaseApiEndpointService {
  private readonly loginAssembler = inject(LoginAssembler);

  /**
   * Realiza el login del usuario
   * @param credentials - Credenciales de acceso (email y password)
   * @returns Observable con la respuesta de login que incluye token y usuario
   */
  login(credentials: LoginCredentialsDto): Observable<{ accessToken: string; user: User }> {
    return this._post<LoginResponseDto>('auth/login', credentials).pipe(
      map(response => ({
        accessToken: response.accessToken,
        user: this.loginAssembler.toEntity(response.user)
      }))
    );
  }

  /**
   * Realiza el logout del usuario
   * @returns Observable vacío
   */
  logout(): Observable<void> {
    return this._post<void>('auth/logout', {});
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
}
