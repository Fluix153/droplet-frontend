import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MethodSelectorView} from "../method-selector/method-selector";
import {TransactionListView} from "../transaction-list/transaction-list";
import {BillingSettingsView} from "../billing-settings/billing-settings";
import {WalletPanelView} from "../wallet-panel/wallet-panel";

export interface Metrics {
    currentBalance: number;
    nextPaymentDue: string;
    monthlyAverage: number;
}

@Component({
    selector: 'app-payments',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './payments.html',
    styleUrls: ['./payments.css']
})
export class PaymentsView {
    readonly metrics = signal<Metrics>({
        currentBalance: 0,
        nextPaymentDue: '',
        monthlyAverage: 0
    });

    constructor() {
        const http = inject(HttpClient);

        effect(() => {
            http.get<Metrics>('/server/metrics').subscribe({
                next: data => this.metrics.set(data),
                error: err => console.error('Error loading metrics:', err)
            });
        });
    }

    protected readonly MethodSelectorView = MethodSelectorView;
    protected readonly TransactionListView = TransactionListView;
    protected readonly BillingSettingsView = BillingSettingsView;
    protected readonly WalletPanelView = WalletPanelView;
}
