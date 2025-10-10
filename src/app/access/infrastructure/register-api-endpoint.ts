import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterCredentialsDto, RegisterResponseDto } from './register-response';

@Injectable({ providedIn: 'root' })
export class RegisterApiEndpoint {
    constructor(private http: HttpClient) {}

    register(credentials: RegisterCredentialsDto): Observable<RegisterResponseDto> {
        return this.http.post<RegisterResponseDto>('/api/register', credentials);
    }
}
