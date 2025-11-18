export type TransactionType = 'charge' | 'refund' | 'fee';

export class TransactionEntity {
    readonly id: string;
    readonly type: TransactionType;
    readonly amount: number;
    readonly date: Date;
    readonly description: string;

    constructor(params: {
        id: string;
        type: TransactionType;
        amount: number;
        date: Date;
        description: string;
    }) {
        this.id = params.id;
        this.type = params.type;
        this.amount = params.amount;
        this.date = params.date;
        this.description = params.description;
    }

    isRefund(): boolean {
        return this.type === 'refund';
    }

    isCharge(): boolean {
        return this.type === 'charge';
    }
}
