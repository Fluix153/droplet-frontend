import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface Transaction {
    id: number;
    name: string;
    date: string;
    amount: number;
}


@Component({
    selector: 'app-transaction-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './transaction-list.html',
    styleUrl: './transaction-list.css'
})
export class TransactionListView {
    private http = inject(HttpClient);
    readonly transactions = signal<Transaction[]>([]);

    constructor() {
        this.loadTransactions();
    }

    private loadTransactions(): void {
        this.http.get<Transaction[]>('http://localhost:3000/transactions').subscribe({
            next: data => this.transactions.set(data),
            error: err => console.error('Error loading transactions:', err)
        });
    }
}