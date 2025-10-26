import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AlertSummary {
  readonly title: string;
  readonly subtitle: string;
  readonly value: number;
  readonly symbol: string;
  readonly type: 'critical' | 'warning' | 'info' | 'resolved';
}

interface ActiveAlert {
  readonly title: string;
  readonly description: string;
  readonly timeAgo: string;
  readonly symbol: string;
  readonly type: 'critical' | 'warning' | 'info';
}

interface SettingItem {
  label: string;
  enabled: boolean;
}

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-center.html',
  styleUrls: ['./notification-center.css']
})
export class NotificationCenterComponent {
  readonly summaryCards: AlertSummary[] = [
    {
      title: 'Critical Alerts',
      subtitle: 'Require immediate attention',
      value: 3,
      symbol: '!',
      type: 'critical'
    },
    {
      title: 'Warnings',
      subtitle: 'Monitor usage trend',
      value: 7,
      symbol: '!',
      type: 'warning'
    },
    {
      title: 'Info Alerts',
      subtitle: 'General notifications',
      value: 12,
      symbol: 'i',
      type: 'info'
    },
    {
      title: 'Resolved Today',
      subtitle: 'Alerts addressed in the last 24h',
      value: 15,
      symbol: '✓',
      type: 'resolved'
    }
  ];

  readonly activeAlerts: ActiveAlert[] = [
    {
      title: 'Water Pressure Critical',
      description: 'Main tank pressure dropped below 15 PSI',
      timeAgo: '2 minutes ago',
      symbol: '!',
      type: 'critical'
    },
    {
      title: 'High Water Usage Detected',
      description: 'Usage 40% above normal for this time',
      timeAgo: '15 minutes ago',
      symbol: '!',
      type: 'warning'
    },
    {
      title: 'Scheduled Maintenance Due',
      description: 'Filter replacement scheduled for tomorrow',
      timeAgo: '1 hour ago',
      symbol: 'i',
      type: 'info'
    }
  ];

  alertTypes: SettingItem[] = [
    { label: 'Critical Alerts', enabled: true },
    { label: 'Usage Warnings', enabled: true },
    { label: 'Maintenance Reminders', enabled: false }
  ];

  deliveryMethods: SettingItem[] = [
    { label: 'Push Notifications', enabled: true },
    { label: 'Email', enabled: true },
    { label: 'SMS', enabled: false }
  ];

  toggleAlertType(item: SettingItem): void {
    item.enabled = !item.enabled;
  }

  toggleDeliveryMethod(item: SettingItem): void {
    item.enabled = !item.enabled;
  }

  save(): void {
    // Solo placeholder por ahora
    console.log('Notification settings saved', {
      alertTypes: this.alertTypes,
      deliveryMethods: this.deliveryMethods
    });
  }
}
