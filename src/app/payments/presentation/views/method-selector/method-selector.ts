import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PaymentMethod {
    id: number;
    type: string;
    last4?: string;
    expires?: string;
    email?: string;
    primary?: boolean;
}

@Component({
    selector: 'app-method-selector',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './method-selector.html',
    styleUrls: ['./method-selector.css']
})
export class MethodSelectorView {
    readonly paymentMethods = signal<PaymentMethod[]>([]);

    constructor() {
        const http = inject(HttpClient);

        effect(() => {
            http.get<PaymentMethod[]>('/server/paymentMethods').subscribe({
                next: data => this.paymentMethods.set(data),
                error: err => console.error('Error loading payment methods:', err)
            });
        });
    }
}
