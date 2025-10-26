// src/app/support/infrastructure/support-assembler.ts

import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { SupportTicket } from '../domain/models/support.entity';
import { SupportTicketDto, SupportTicketsResponse } from './support-response';

/**
 * Assembler para convertir SupportTicketDto en entidades SupportTicket.
 */
@Injectable({ providedIn: 'root' })
export class SupportAssembler implements BaseAssembler<SupportTicket, SupportTicketDto, SupportTicketsResponse> {
  toEntityFromResource(resource: SupportTicketDto): SupportTicket {
    return SupportTicket.create({
      ...resource,
      id: String(resource.id)
    });
  }

  toResourceFromEntity(entity: SupportTicket): SupportTicketDto {
    return {
      id: entity.id,
      userId: entity.userId,
      subject: entity.subject,
      priority: entity.priority,
      description: entity.description,
      status: entity.status,
      createdAt: entity.createdAt.toISOString(),
      ticketNumber: entity.ticketNumber
    };
  }

  toEntitiesFromResponse(response: SupportTicketsResponse): SupportTicket[] {
    const maybeArray = response as unknown as SupportTicketDto[];
    const collection = Array.isArray(response?.data)
      ? response.data!
      : Array.isArray(maybeArray)
        ? maybeArray
        : [];
    return collection.map(resource => this.toEntityFromResource(resource));
  }

  toDto(entity: SupportTicket): SupportTicketDto {
    return this.toResourceFromEntity(entity);
  }
}
