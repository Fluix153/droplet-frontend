export type BillingCycle = 'monthly' | 'yearly';

export class BillingSettingsEntity {
    readonly autoPayEnabled: boolean;
    readonly emailNotifications: boolean;
    readonly billingCycle: BillingCycle;

    constructor(params: {
        autoPayEnabled: boolean;
        emailNotifications: boolean;
        billingCycle: BillingCycle;
    }) {
        this.autoPayEnabled = params.autoPayEnabled;
        this.emailNotifications = params.emailNotifications;
        this.billingCycle = params.billingCycle;
    }

    isMonthly(): boolean {
        return this.billingCycle === 'monthly';
    }

    isAutoPay(): boolean {
        return this.autoPayEnabled;
    }
}
