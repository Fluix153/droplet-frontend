import { Component, inject } from '@angular/core';
import { PaymentsStore } from '../../../application/payments.store';
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.html',
    styleUrls: ['./transaction-list.css'],
    imports: [
        CurrencyPipe,
        DatePipe,
        NgForOf
    ]
})
export class TransactionListComponent {
    private readonly store = inject(PaymentsStore);
    readonly transactions = this.store.recentCharges;
}
