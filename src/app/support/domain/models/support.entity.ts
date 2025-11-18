export type TicketStatus = 'Open' | 'In Progress' | 'Solved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

/**
 * Entidad de dominio que representa un Ticket de Soporte.
 * Es una clase que contiene las propiedades y lógica de negocio pura
 * relacionada con un ticket, independientemente de cómo se almacena o se muestra.
 */
export class SupportTicket {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly subject: string,
        public readonly priority: TicketPriority,
        public readonly description: string,
        public readonly status: TicketStatus,
        public readonly createdAt: Date,
        public readonly ticketNumber?: string,
    ) {}

    /**
     * Lógica de negocio simple: Determina si un ticket se considera cerrado.
     * @returns {boolean} True si el estado es 'Solved' o 'Closed'.
     */
    isClosed(): boolean {
        return this.status === 'Solved' || this.status === 'Closed';
    }

    /**
     * Lógica de negocio simple: Determina si un ticket tiene prioridad alta o crítica.
     * @returns {boolean} True si la prioridad es 'High' o 'Critical'.
     */
    isUrgent(): boolean {
        return this.priority === 'High' || this.priority === 'Critical';
    }
}