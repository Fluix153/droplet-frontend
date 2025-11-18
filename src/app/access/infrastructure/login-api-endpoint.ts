import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginCredentialsDto } from './login-response';
import { User } from '../domain/models/user.entity';
import { UsersApiEndpoint } from './users-api-endpoint';

@Injectable({ providedIn: 'root' })
export class LoginApiEndpoint {
  constructor(private readonly usersEndpoint: UsersApiEndpoint) {}

  /**
   * Realiza el login del usuario simulado con json-server
   * Busca el usuario en la base de datos por email y password
   */
  login(credentials: LoginCredentialsDto): Observable<{ accessToken: string; user: User }> {
    return this.usersEndpoint.findByCredentials(credentials).pipe(
      map(user => ({
        accessToken: this.generateToken(user.email),
        user
      }))
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

  private generateToken(email: string): string {
    return btoa(`${email}:${Date.now()}`);
  }
}

