// src/app/support/infrastructure/support-assembler.ts

import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { SupportTicket } from '../domain/models/support.entity';
import { SupportTicketDto } from './support-response';

/**
 * Assembler para convertir SupportTicketDto en entidades SupportTicket.
 * Se encarga de transformar los datos de la capa de infraestructura
 * al modelo de dominio, incluyendo la conversión de tipos necesaria.
 */
@Injectable({ providedIn: 'root' })
export class SupportAssembler extends BaseAssembler<SupportTicketDto, SupportTicket> {

    /**
     * Convierte un SupportTicketDto en una instancia de SupportTicket.
     * Transforma la propiedad createdAt de string a Date.
     *
     * @param dto - El DTO de ticket de soporte a convertir
     * @returns Una nueva instancia de SupportTicket
     */
    toEntity(dto: SupportTicketDto): SupportTicket {
        return new SupportTicket(
            dto.id,
            dto.userId,
            dto.subject,
            dto.priority,
            dto.description,
            dto.status,
            new Date(dto.createdAt), // Conversión de string a Date
            dto.ticketNumber
        );
    }
}