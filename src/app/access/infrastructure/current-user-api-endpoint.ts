import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../domain/models/user.entity';
import { UsersApiEndpoint } from './users-api-endpoint';

/**
 * Endpoint encargado de recuperar al usuario autenticado.
 */
@Injectable({ providedIn: 'root' })
export class CurrentUserApiEndpoint {
  constructor(private readonly usersEndpoint: UsersApiEndpoint) {}

  /**
   * Obtiene el usuario a partir de su correo electrónico.
   */
  getByEmail(email: string): Observable<User> {
    return this.usersEndpoint.findByEmail(email);
  }
}
