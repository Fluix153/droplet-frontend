import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseApiEndpointService } from '../../shared/infrastructure/base-api-endpoint.service';
import { User } from '../domain/models/user.entity';
import { LoginAssembler } from './login-assembler';
import { UserResource, UsersResponse } from './users-response';
import { LoginCredentialsDto } from './login-response';
import { RegisterCredentialsDto } from './register-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersApiEndpoint extends BaseApiEndpointService<
  User,
  UserResource,
  UsersResponse,
  LoginAssembler
> {
  constructor(http: HttpClient, assembler: LoginAssembler) {
    super(http, `${environment.apiBaseUrl}/users`, assembler);
  }

  findByCredentials(credentials: LoginCredentialsDto): Observable<User> {
    const params = new HttpParams()
      .set('email', credentials.email)
      .set('password', credentials.password);

    return this.http.get<UserResource[]>(this.endpointUrl, { params }).pipe(
      map(users => {
        if (!users || users.length === 0) {
          throw new Error('Credenciales inválidas');
        }
        return this.assembler.toEntityFromResource(users[0]);
      })
    );
  }

  findByEmail(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);

    return this.http.get<UserResource[]>(this.endpointUrl, { params }).pipe(
      map(users => {
        if (!users || users.length === 0) {
          throw new Error('Usuario no encontrado');
        }
        return this.assembler.toEntityFromResource(users[0]);
      })
    );
  }

  createWithCredentials(credentials: RegisterCredentialsDto): Observable<User> {
    const payload = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      role: credentials.role ?? 'user',
      phone: credentials.phone ?? ''
    };

    return this.http.post<UserResource>(this.endpointUrl, payload).pipe(
      map(resource => this.assembler.toEntityFromResource(resource))
    );
  }
}
