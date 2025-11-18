import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WalletResponse } from './wallet-response';

@Injectable({ providedIn: 'root' })
export class WalletApiEndpoint {
    private readonly baseUrl = '/api/payments/wallet';

    constructor(private http: HttpClient) {}

    getWalletInfo(): Observable<WalletResponse> {
        return this.http.get<WalletResponse>(`${this.baseUrl}/info`);
    }

    addFunds(amount: number): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/add`, { amount });
    }

    withdrawFunds(amount: number): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/withdraw`, { amount });
    }
}
