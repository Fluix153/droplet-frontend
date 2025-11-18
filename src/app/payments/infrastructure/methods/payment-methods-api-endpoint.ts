import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentMethodsResponse } from './payment-methods-response';

@Injectable({ providedIn: 'root' })
export class PaymentMethodsApiEndpoint {
    private readonly baseUrl = '/api/payments/methods';

    constructor(private http: HttpClient) {}

    getAvailableMethods(): Observable<PaymentMethodsResponse[]> {
        return this.http.get<PaymentMethodsResponse[]>(`${this.baseUrl}/available`);
    }
}
