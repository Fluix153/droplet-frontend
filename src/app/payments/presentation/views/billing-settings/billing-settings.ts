import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface BillingSettings {
    autoPay: boolean;
    emailNotifications: boolean;
    smsAlerts: boolean;
    billingCycle: string;
}

@Component({
    selector: 'app-billing-settings',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './billing-settings.html',
    styleUrls: ['./billing-settings.css']
})
export class BillingSettingsView {
    readonly billingSettings = signal<BillingSettings>({
        autoPay: false,
        emailNotifications: false,
        smsAlerts: false,
        billingCycle: ''
    });

    constructor() {
        const http = inject(HttpClient);

        effect(() => {
            http.get<BillingSettings>('/server/billingSettings').subscribe({
                next: data => this.billingSettings.set(data),
                error: err => console.error('Error loading billing settings:', err)
            });
        });
    }
}
