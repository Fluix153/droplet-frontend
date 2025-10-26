// src/app/support/infrastructure/support-api.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiEndpointService } from '../../shared/infrastructure/base-api-endpoint.service';
import { SupportAssembler } from './support-assembler';
import { SupportTicket } from '../domain/models/support.entity';
import { SupportTicketDto, CreateTicketDto } from './support-response';

/**
 * Servicio de API para gestionar tickets de soporte.
 * Hereda de BaseApiEndpointService e inyecta SupportAssembler para
 * convertir DTOs en entidades de dominio.
 */
@Injectable({ providedIn: 'root' })
export class SupportApiService extends BaseApiEndpointService {

  constructor(
    private supportAssembler: SupportAssembler
  ) {
    super();
  }

  /**
   * Obtiene todos los tickets de soporte de un usuario específico.
   * @param userId - ID del usuario
   * @returns Observable con array de tickets convertidos a entidades de dominio
   */
  getTicketsByUserId(userId: string): Observable<SupportTicket[]> {
    return this._get<SupportTicketDto[]>(`supportTickets?userId=${userId}`)
      .pipe(
        map((ticketDtos: SupportTicketDto[]) => this.supportAssembler.toEntityList(ticketDtos))
      );
  }

  /**
   * Crea un nuevo ticket de soporte.
   * @param ticketData - Datos del ticket a crear
   * @returns Observable con el ticket creado convertido a entidad de dominio
   */
  createTicket(ticketData: CreateTicketDto): Observable<SupportTicket> {
    return this._post<SupportTicketDto>('supportTickets', ticketData)
      .pipe(
        map((ticketDto: SupportTicketDto) => this.supportAssembler.toEntity(ticketDto))
      );
  }
}