import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthResponse} from './models/auth-response.model';
import {User} from './models/user.model';
import {TokenService} from '../../core/services/token.service';

@Injectable({providedIn: 'root'})
export class AuthService {
    private apiUrl = environment.apiBaseUrl;
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient, private tokenService: TokenService) {
    }

    login(payload: { email: string; password: string }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, payload);
    }

    register(userData: any): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/auth/register`, userData);
    }

    profile(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/auth/profile`);
    }

    setCurrentUser(user: User): void {
        this.currentUserSubject.next(user);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    logout(): void {
        this.tokenService.clear();
        this.currentUserSubject.next(null);
    }

    // TODO: Método temporal para pruebas - verificar que el header Authorization se agregue cuando hay token
    // Este método se puede usar para verificar que el interceptor funciona correctamente
    // Ejemplo de uso: authService.testProfileCall().subscribe(console.log);
    testProfileCall(): Observable<User> {
        return this.profile();
    }
}