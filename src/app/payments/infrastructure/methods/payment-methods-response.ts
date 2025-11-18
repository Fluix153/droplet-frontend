export interface PaymentMethodsResponse {
    id: string;
    type: 'visa' | 'paypal' | 'bank-transfer';
    label: string;
    lastDigits?: string;
    isPrimary: boolean;
}
