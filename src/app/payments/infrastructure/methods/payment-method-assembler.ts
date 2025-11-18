import { PaymentMethodsResponse } from './payment-methods-response';
import { PaymentMethodEntity } from '../../domain/model/payment-method.entity';

export class PaymentMethodAssembler {
    static fromResponse(response: PaymentMethodsResponse): PaymentMethodEntity {
        return new PaymentMethodEntity({
            id: response.id,
            type: response.type,
            label: response.label,
            lastDigits: response.lastDigits,
            isPrimary: response.isPrimary,
        });
    }
}
