import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RegisterCredentialsDto } from './register-response';
import { User } from '../domain/models/user.entity';
import { UsersApiEndpoint } from './users-api-endpoint';

@Injectable({ providedIn: 'root' })
export class RegisterApiEndpoint {
  constructor(private readonly usersEndpoint: UsersApiEndpoint) {}

  /**
   * Registra un nuevo usuario en la base de datos
   */
  register(credentials: RegisterCredentialsDto): Observable<{ accessToken: string; user: User }> {
    return this.usersEndpoint.createWithCredentials(credentials).pipe(
      map(user => ({
        accessToken: this.generateToken(user.email),
        user
      }))
    );
  }

  private generateToken(email: string): string {
    return btoa(`${email}:${Date.now()}`);
  }
}
