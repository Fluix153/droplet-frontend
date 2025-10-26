import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseApiEndpointService } from '../../shared/infrastructure/base-api-endpoint.service';
import { SupportTicket } from '../domain/models/support.entity';
import { SupportTicketDto, CreateTicketDto, SupportTicketsResponse } from './support-response';
import { SupportAssembler } from './support-assembler';
import { environment } from '../../../environments/environment';

/**
 * Servicio de API para operaciones de soporte
 */
@Injectable({
  providedIn: 'root'
})
export class SupportApiService extends BaseApiEndpointService<
  SupportTicket,
  SupportTicketDto,
  SupportTicketsResponse,
  SupportAssembler
> {
  constructor(http: HttpClient, assembler: SupportAssembler) {
    super(http, `${environment.support.apiBaseUrl}${environment.support.ticketsEndpoint}`, assembler);
  }

  /**
   * Obtiene todos los tickets de un usuario específico
   */
  getTicketsByUserId(userId: string): Observable<SupportTicket[]> {
    return this.http.get<SupportTicketDto[]>(`${this.endpointUrl}?userId=${userId}`).pipe(
      map(tickets => tickets.map(ticket => this.assembler.toEntityFromResource(ticket)))
    );
  }

  /**
   * Crea un nuevo ticket de soporte
   */
  createTicket(ticketData: CreateTicketDto): Observable<SupportTicket> {
    const newTicket = {
      ...ticketData,
      ticketNumber: this.generateTicketNumber(),
      status: 'Open',
      createdAt: new Date().toISOString()
    };

    return this.http.post<SupportTicketDto>(this.endpointUrl, newTicket).pipe(
      map(ticket => this.assembler.toEntityFromResource(ticket))
    );
  }

  /**
   * Genera un número de ticket aleatorio único
   */
  private generateTicketNumber(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}

