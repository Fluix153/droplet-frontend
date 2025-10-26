import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type TicketStatus = 'Open' | 'In Progress' | 'Solved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

type SupportTicketProps = {
  id: string;
  userId: string;
  subject: string;
  priority: TicketPriority;
  description: string;
  status: TicketStatus;
  createdAt: Date;
  ticketNumber?: string;
};

type SupportTicketInit = Omit<SupportTicketProps, 'createdAt'> & { createdAt: string | Date };

/**
 * Entidad de dominio que representa un Ticket de Soporte.
 * Contiene las propiedades y lógica de negocio relacionadas con un ticket,
 * independiente de su persistencia o representación.
 */
export class SupportTicket implements BaseEntity {
  private constructor(private readonly props: SupportTicketProps) {}

  static create(init: SupportTicketInit): SupportTicket {
    const createdAt =
      init.createdAt instanceof Date ? init.createdAt : new Date(init.createdAt);
    return new SupportTicket({
      id: init.id,
      userId: init.userId,
      subject: init.subject,
      priority: init.priority,
      description: init.description,
      status: init.status,
      ticketNumber: init.ticketNumber,
      createdAt
    });
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get subject(): string {
    return this.props.subject;
  }

  get priority(): TicketPriority {
    return this.props.priority;
  }

  get description(): string {
    return this.props.description;
  }

  get status(): TicketStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get ticketNumber(): string | undefined {
    return this.props.ticketNumber;
  }

  /**
   * Determina si un ticket se considera cerrado.
   */
  isClosed(): boolean {
    return this.status === 'Solved' || this.status === 'Closed';
  }

  /**
   * Determina si un ticket tiene prioridad alta o crítica.
   */
  isUrgent(): boolean {
    return this.priority === 'High' || this.priority === 'Critical';
  }
}
