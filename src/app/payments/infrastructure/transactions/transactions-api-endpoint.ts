import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionsResponse } from './transactions-response';

@Injectable({ providedIn: 'root' })
export class TransactionsApiEndpoint {
    private readonly baseUrl = '/api/payments/transactions';

    constructor(private http: HttpClient) {}

    getRecentTransactions(): Observable<TransactionsResponse[]> {
        return this.http.get<TransactionsResponse[]>(`${this.baseUrl}/recent`);
    }
}
