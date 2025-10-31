import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Transaction {
    id: number;
    name: string;
    date: string;
    amount: number;
}

const http = inject(HttpClient);

export const transactions = signal<Transaction[]>([]);

effect(() => {
    http.get<Transaction[]>('/server/transactions').subscribe({
        next: data => transactions.set(data),
        error: err => console.error('Error loading transactions:', err)
    });
});

@Component({
    selector: 'app-transaction-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './transaction-list.html',
    styleUrls: ['./transaction-list.css']
})
export class TransactionListView {
    readonly transactions = signal<Transaction[]>([]);

    constructor() {
        const http = inject(HttpClient);
        effect(() => {
            http.get<Transaction[]>('/server/transactions').subscribe({
                next: data => this.transactions.set(data),
                error: err => console.error('Error loading transactions:', err)
            });
        });
    }
}