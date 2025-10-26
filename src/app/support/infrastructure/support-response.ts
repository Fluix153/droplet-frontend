import { TicketStatus, TicketPriority } from '../domain/models/support.entity';

/**
 * DTO para respuesta de tickets de soporte.
 * Idéntico a la clase SupportTicket, pero con createdAt como string para serialización JSON.
 */
export interface SupportTicketDto {
  readonly id: string;
  readonly userId: string;
  readonly subject: string;
  readonly priority: TicketPriority;
  readonly description: string;
  readonly status: TicketStatus;
  readonly createdAt: string;
  readonly ticketNumber?: string;
}

/**
 * DTO para crear un nuevo ticket de soporte.
 * Contiene solo las propiedades necesarias para la creación.
 */
export interface CreateTicketDto {
  readonly subject: string;
  readonly priority: TicketPriority;
  readonly description: string;
  readonly userId: string;
}