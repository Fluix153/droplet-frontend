export interface SupportTicket {
    id: string;
    userId: string;
    subject: string;
    ticketNumber: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    description: string;
    status: 'Open' | 'In Progress' | 'Solved' | 'Closed';
    createdAt: string;
    updatedAt?: string;
}

