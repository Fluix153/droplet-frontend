import { PaymentsStore } from './payments.store';
import { TransactionEntity } from '../domain/model/transaction.entity';

describe('PaymentsStore', () => {
    let store: PaymentsStore;

    beforeEach(() => {
        store = new PaymentsStore();
    });

    it('should initialize with empty state', () => {
        expect(store.currentBalance()).toBe(0);
        expect(store.recentCharges().length).toBe(0);
    });

    it('should store transactions and compute charges', () => {
        const txs = [
            new TransactionEntity({ id: '1', type: 'charge', amount: 100, date: new Date(), description: 'Service' }),
            new TransactionEntity({ id: '2', type: 'refund', amount: -25, date: new Date(), description: 'Refund' }),
        ];
        store.setTransactions(txs);
        expect(store.recentCharges().length).toBe(1);
        expect(store.recentCharges()[0].description).toBe('Service');
    });
});
