export interface TransactionsResponse {
    id: string;
    type: 'charge' | 'refund' | 'fee';
    amount: number;
    date: string;
    description: string;
}
