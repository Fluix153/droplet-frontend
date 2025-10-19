import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LoginCredentialsDto, LoginResponseDto } from './login-response';
import { LoginAssembler } from './login-assembler';
import { User } from '../domain/models/user.entity';
import { environment } from '../../../environments/environment.dev';

@Injectable({ providedIn: 'root' })
export class LoginApiEndpoint {
  private readonly apiUrl = environment.apiBaseUrl;
  private readonly loginAssembler = inject(LoginAssembler);

  constructor(private http: HttpClient) {}

  /**
   * Realiza el login del usuario simulado con json-server
   * Busca el usuario en la base de datos por email y password
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
   * Realiza el logout del usuario (simulado)
   */
  logout(): Observable<void> {
    return new Observable(observer => {
      observer.next();
      observer.complete();
    });
  }
}

