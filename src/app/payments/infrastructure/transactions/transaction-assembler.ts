import { TransactionsResponse } from './transactions-response';
import { TransactionEntity } from '../../domain/model/transaction.entity';

export class TransactionAssembler {
    static fromResponse(response: TransactionsResponse): TransactionEntity {
        return new TransactionEntity({
            id: response.id,
            type: response.type,
            amount: response.amount,
            date: new Date(response.date),
            description: response.description,
        });
    }
}
