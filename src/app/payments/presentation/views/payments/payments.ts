import { HttpClient } from '@angular/common/http';
import { signal, effect } from '@angular/core';
import { inject } from '@angular/core';

const http = inject(HttpClient);

export const paymentMethods = signal<any[]>([]);
export const transactions = signal<any[]>([]);
export const billingSettings = signal<any>({});
export const wallet = signal<any>({});

effect(() => {
    http.get('/server/paymentMethods').subscribe(data => paymentMethods.set(data));
    http.get('/server/transactions').subscribe(data => transactions.set(data));
    http.get('/server/billingSettings').subscribe(data => billingSettings.set(data));
    http.get('/server/wallet').subscribe(data => wallet.set(data));
});
