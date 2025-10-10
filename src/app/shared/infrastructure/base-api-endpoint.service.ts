import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Clase base que contiene la lógica común para realizar llamadas HTTP
 * Los servicios específicos heredan de esta clase para evitar duplicación de código
 */
@Injectable({
    providedIn: 'root'
})
export abstract class BaseApiEndpointService {
    protected readonly http = inject(HttpClient);
    protected readonly apiBaseUrl = environment.apiBaseUrl;

    /**
     * Realiza una petición GET
     * @param endpoint - Endpoint relativo a la base URL
     * @param params - Parámetros opcionales de consulta
     */
    protected _get<T>(endpoint: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(`${this.apiBaseUrl}/${endpoint}`, {
            params,
            headers: this.getHeaders()
        });
    }

    /**
     * Realiza una petición POST
     * @param endpoint - Endpoint relativo a la base URL
     * @param body - Cuerpo de la petición
     */
    protected _post<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.apiBaseUrl}/${endpoint}`, body, {
            headers: this.getHeaders()
        });
    }

    /**
     * Realiza una petición PUT
     * @param endpoint - Endpoint relativo a la base URL
     * @param body - Cuerpo de la petición
     */
    protected _put<T>(endpoint: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.apiBaseUrl}/${endpoint}`, body, {
            headers: this.getHeaders()
        });
    }

    /**
     * Realiza una petición PATCH
     * @param endpoint - Endpoint relativo a la base URL
     * @param body - Cuerpo de la petición
     */
    protected _patch<T>(endpoint: string, body: any): Observable<T> {
        return this.http.patch<T>(`${this.apiBaseUrl}/${endpoint}`, body, {
            headers: this.getHeaders()
        });
    }

    /**
     * Realiza una petición DELETE
     * @param endpoint - Endpoint relativo a la base URL
     */
    protected _delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.apiBaseUrl}/${endpoint}`, {
            headers: this.getHeaders()
        });
    }

    /**
     * Obtiene los headers por defecto para las peticiones
     * Los servicios hijos pueden sobrescribir este método para agregar headers específicos
     */
    protected getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }

    /**
     * Construye la URL completa para un endpoint
     * @param endpoint - Endpoint relativo
     */
    protected buildUrl(endpoint: string): string {
        return `${this.apiBaseUrl}/${endpoint}`;
    }
}