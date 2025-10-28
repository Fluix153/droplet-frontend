export type PaymentMethodType = 'visa' | 'paypal' | 'bank-transfer';

export class PaymentMethodEntity {
    readonly id: string;
    readonly type: PaymentMethodType;
    readonly label: string;
    readonly lastDigits?: string;
    readonly isPrimary: boolean;

    constructor(params: {
        id: string;
        type: PaymentMethodType;
        label: string;
        lastDigits?: string;
        isPrimary: boolean;
    }) {
        this.id = params.id;
        this.type = params.type;
        this.label = params.label;
        this.lastDigits = params.lastDigits;
        this.isPrimary = params.isPrimary;
    }

    isCard(): boolean {
        return this.type === 'visa';
    }

    isDigital(): boolean {
        return this.type === 'paypal';
    }
}
