// src/app/support/infrastructure/support-assembler.ts

import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { SupportTicket } from '../domain/models/support.entity';
import { SupportTicketDto } from './support-response';

/**
 * Assembler para convertir SupportTicketDto en entidades SupportTicket.
 */
@Injectable({ providedIn: 'root' })
export class SupportAssembler implements BaseAssembler<SupportTicket, SupportTicketDto, any> {

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
            new Date(dto.createdAt) // Conversión de string a Date
        );
    }

    toEntityFromResource(resource: SupportTicketDto): SupportTicket {
        return this.toEntity(resource);
    }

    toResourceFromEntity(entity: SupportTicket): SupportTicketDto {
        return {
            id: entity.id,
            userId: entity.userId,
            subject: entity.subject,
            priority: entity.priority,
            description: entity.description,
            status: entity.status,
            createdAt: entity.createdAt.toISOString()
        };
    }

    toEntitiesFromResponse(response: any): SupportTicket[] {
        if (Array.isArray(response)) {
            return response.map(dto => this.toEntity(dto));
        }
        return [];
    }

    toDto(entity: SupportTicket): SupportTicketDto {
        return this.toResourceFromEntity(entity);
    }
}
