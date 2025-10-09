import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Alert, NotificationSettings } from '../../features/alerts/models/alert.model';

@Injectable({
    providedIn: 'root'
})
export class AlertsService { // Se añade el sufijo "Service" por convención

    constructor(private http: HttpClient) { }

    // --- MÉTODOS SIMULADOS (para construir la UI sin API) ---
    getActiveAlerts(): Observable<Alert[]> {
        const mockAlerts: Alert[] = [
            { id: '1', type: 'critical', message: 'Water Pressure Critical', description: 'Main tank pressure dropped below 15 PSI', timestamp: '2 minutes ago' },
            { id: '2', type: 'warning', message: 'High Water Usage Detected', description: 'Usage 40% above normal for this time', timestamp: '15 minutes ago' },
            { id: '3', type: 'info', message: 'Scheduled Maintenance Due', description: 'Filter replacement scheduled for tomorrow', timestamp: '1 hour ago' },
        ];
        return of(mockAlerts); // 'of' crea un Observable a partir de datos estáticos
    }

    dismissAlert(alertId: string): void {
        console.log(`Alerta con ID: ${alertId} ha sido descartada.`);
        // En el futuro, aquí harías una llamada HTTP a tu API
        // return this.http.post(`${this.apiUrl}/dismiss/${alertId}`, {});
    }

    getNotificationSettings(): Observable<NotificationSettings> {
        const mockSettings: NotificationSettings = {
            alertTypes: {
                criticalAlerts: true,
                usageWarnings: true,
                maintenanceReminders: false,
            },
            deliveryMethods: {
                pushNotifications: true,
                email: false,
                sms: true,
            },
        };
        return of(mockSettings);
    }

    saveNotificationSettings(settings: NotificationSettings): Observable<void> {
        console.log('Guardando configuración:', settings);
        return of(undefined); // Simula una respuesta exitosa sin contenido
    }

    getAlertsSummary(): Observable<any> {
        const mockSummary = {
            critical: 3,
            warnings: 7,
            info: 12,
            resolved: 15
        };
        return of(mockSummary);
    }
}

