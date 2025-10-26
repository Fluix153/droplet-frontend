import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RegisterCredentialsDto, RegisterResponseDto } from './register-response';
import { RegisterAssembler } from './register-assembler';
import { User } from '../domain/models/user.entity';
import { environment } from '../../../environments/environment.dev';

@Injectable({ providedIn: 'root' })
export class RegisterApiEndpoint {
  private readonly apiUrl = environment.apiBaseUrl;
  private readonly registerAssembler = inject(RegisterAssembler);

  constructor(private http: HttpClient) {}

  /**
   * Registra un nuevo usuario en la base de datos
   */
  register(credentials: RegisterCredentialsDto): Observable<{ accessToken: string; user: User }> {
    // Crear el objeto de usuario para guardar en la base de datos
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
