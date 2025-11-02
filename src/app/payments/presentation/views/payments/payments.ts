import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MethodSelectorView } from '../method-selector/method-selector';
import { TransactionListView } from '../transaction-list/transaction-list';
import { BillingSettingsView } from '../billing-settings/billing-settings';
import { WalletPanelView } from '../wallet-panel/wallet-panel';

@Component({
    selector: 'app-payments',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './payments.html',
    styleUrls: ['./payments.css'],
    providers: [DatePipe, CurrencyPipe]
})
export class PaymentsView {
    readonly metrics = signal({
        currentBalance: 0,
        nextPaymentDue: '',
        monthlyAverage: 0
    });

    constructor() {
        const http = inject(HttpClient);
        effect(() => {
            http.get<any>('/server').subscribe({
                next: data => this.metrics.set(data.metrics),
                error: err => console.error('Error loading metrics:', err)
            });
        });
    }

    formatDate(dateStr: string): string {
        const date = new Date(dateStr);
        return isNaN(date.getTime())
            ? 'Invalid Date'
            : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    protected readonly MethodSelectorView = MethodSelectorView;
    protected readonly TransactionListView = TransactionListView;
    protected readonly BillingSettingsView = BillingSettingsView;
    protected readonly WalletPanelView = WalletPanelView;
}
