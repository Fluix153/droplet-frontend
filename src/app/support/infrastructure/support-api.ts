import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseApiEndpointService } from '../../shared/infrastructure/base-api-endpoint.service';
import { SupportTicket } from '../domain/models/support.entity';
import { SupportTicketDto, CreateTicketDto } from './support-response';
import { SupportAssembler } from './support-assembler';
import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { environment } from '../../../environments/environment.dev';

interface SupportResource extends BaseResource {
  userId: string;
  subject: string;
  priority: string;
  description: string;
  status: string;
  createdAt: string;
}

interface SupportResponse extends BaseResponse {
  data: SupportResource[];
}

/**
 * Servicio de API para operaciones de soporte
 */
@Injectable({
  providedIn: 'root'
})
export class SupportApiService extends BaseApiEndpointService<
  SupportTicket,
  SupportResource,
  SupportResponse,
  SupportAssembler
> {
  constructor(http: HttpClient, assembler: SupportAssembler) {
    super(http, `${environment.apiBaseUrl}/supportTickets`, assembler);
  }

  /**
   * Obtiene todos los tickets de un usuario específico
   */
  getTicketsByUserId(userId: string): Observable<SupportTicket[]> {
    return this.http.get<SupportTicketDto[]>(`${this.endpointUrl}?userId=${userId}`).pipe(
      map(tickets => tickets.map(ticket => this.assembler.toEntity(ticket)))
    );
  }

  /**
   * Crea un nuevo ticket de soporte
   */
  createTicket(ticketData: CreateTicketDto): Observable<SupportTicket> {
    const newTicket = {
      ...ticketData,
      status: 'Open',
      createdAt: new Date().toISOString()
    };

    return this.http.post<SupportTicketDto>(this.endpointUrl, newTicket).pipe(
      map(ticket => this.assembler.toEntity(ticket))
    );
  }
}

