import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-billing-settings',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './billing-settings.html',
    styleUrls: ['./billing-settings.css']
})
export class BillingSettingsView {
    autoPay = true;
    emailNotifications = true;
    smsAlerts = false;
    billingCycle = 'Monthly';

    saveSettings() {
        console.log('Settings saved:', {
            autoPay: this.autoPay,
            emailNotifications: this.emailNotifications,
            smsAlerts: this.smsAlerts,
            billingCycle: this.billingCycle
        });
    }
}
