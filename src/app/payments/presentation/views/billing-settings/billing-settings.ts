import { Component, inject } from '@angular/core';
import { PaymentsStore } from '../../../application/payments.store';

@Component({
    selector: 'app-billing-settings',
    standalone: true,
    templateUrl: './billing-settings.html',
    styleUrls: ['./billing-settings.css'],
})
export class BillingSettingsComponent {
    private readonly store = inject(PaymentsStore);
    readonly settings = this.store.billingSettings;
}
