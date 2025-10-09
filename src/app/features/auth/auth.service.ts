import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from './models/auth-response.model';
import { User } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    login(payload: { email: string; password: string }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, payload);
    }

    profile(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/auth/profile`);
    }

    // TODO: Método temporal para pruebas - verificar que el header Authorization se agregue cuando hay token
    // Este método se puede usar para verificar que el interceptor funciona correctamente
    // Ejemplo de uso: authService.testProfileCall().subscribe(console.log);
    testProfileCall(): Observable<User> {
        return this.profile();
    }
}