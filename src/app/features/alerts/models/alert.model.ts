export interface Alert {
    id: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    description: string;
    timestamp: string;
}

export interface NotificationSettings {
    alertTypes: {
        criticalAlerts: boolean;
        usageWarnings: boolean;
        maintenanceReminders: boolean;
    };
    deliveryMethods: {
        pushNotifications: boolean;
        email: boolean;
        sms: boolean;
    };
}