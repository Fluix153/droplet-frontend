import { Injectable, computed, signal } from '@angular/core';
import { TransactionEntity } from '../domain/model/transaction.entity';
import { PaymentMethodEntity } from '../domain/model/payment-method.entity';
import { WalletEntity } from '../domain/model/wallet.entity';
import { BillingSettingsEntity } from '../domain/model/billing-settings.entity';

@Injectable({ providedIn: 'root' })
export class PaymentsStore {
    private readonly transactions = signal<TransactionEntity[]>([]);
    readonly paymentMethods = signal<PaymentMethodEntity[]>([]);
    readonly wallet = signal<WalletEntity | null>(null);
    readonly billingSettings = signal<BillingSettingsEntity | null>(null);

    readonly currentBalance = computed(() =>
        this.wallet()?.balance ?? 0
    );

    readonly primaryMethod = computed(() =>
        this.paymentMethods().find(m => m.isPrimary)
    );

    readonly recentCharges = computed(() =>
        this.transactions().filter(t => t.isCharge())
    );

    setTransactions(list: TransactionEntity[]): void {
        this.transactions.set(list);
    }

    setPaymentMethods(list: PaymentMethodEntity[]): void {
        this.paymentMethods.set(list);
    }

    setWallet(data: WalletEntity): void {
        this.wallet.set(data);
    }

    setBillingSettings(data: BillingSettingsEntity): void {
        this.billingSettings.set(data);
    }

    clear(): void {
        this.transactions.set([]);
        this.paymentMethods.set([]);
        this.wallet.set(null);
        this.billingSettings.set(null);
    }
}
