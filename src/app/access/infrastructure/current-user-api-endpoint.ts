import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../domain/models/user.entity';
import { LoginAssembler } from './login-assembler';
import { environment } from '../../../environments/environment.dev';

/**
 * Endpoint encargado de recuperar al usuario autenticado.
 */
@Injectable({ providedIn: 'root' })
export class CurrentUserApiEndpoint {
  private readonly apiUrl = environment.apiBaseUrl;
  private readonly loginAssembler = inject(LoginAssembler);

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el usuario a partir de su correo electrónico.
   */
  getByEmail(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);

    return this.http.get<any[]>(`${this.apiUrl}/users`, { params }).pipe(
      map(users => {
        if (!users || users.length === 0) {
          throw new Error('Usuario no encontrado');
        }

        return this.loginAssembler.toEntity(users[0]);
      })
    );
  }
}
