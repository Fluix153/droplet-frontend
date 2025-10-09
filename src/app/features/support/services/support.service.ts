import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SupportTicket} from '../models/support-ticket.model';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SupportService {
    private apiUrl = environment.apiBaseUrl || 'http://localhost:3001/api';

    constructor(private http: HttpClient) {
    }

    /**
     * Obtiene los tickets de soporte para un usuario específico
     * @param userId - ID del usuario
     * @returns Observable con array de tickets de soporte
     */
    getSupportTicketsForUser(userId: string): Observable<SupportTicket[]> {
        return this.http.get<SupportTicket[]>(`${this.apiUrl}/supportTickets?userId=${userId}`);
    }

    /**
     * Crea un nuevo ticket de soporte
     * @param ticketData - Datos del ticket a crear
     * @returns Observable con el ticket creado
     */
    createSupportTicket(ticketData: Partial<SupportTicket>): Observable<SupportTicket> {
        return this.http.post<SupportTicket>(`${this.apiUrl}/supportTickets`, ticketData);
    }
}
