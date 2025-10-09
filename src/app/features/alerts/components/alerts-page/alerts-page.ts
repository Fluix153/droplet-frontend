import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert, NotificationSettings } from '../../models/alert.model';
import { AlertsService } from '../../../../core/services/alerts';
import {AlertsListComponent} from "../alerts-list/alerts-list";
import {AsyncPipe} from "@angular/common";
import {NotificationSettingsComponent} from "../notification-settings/notification-settings";
import {AlertsSummaryComponent} from "../alerts-summary/alerts-summary";

@Component({
    selector: 'app-alerts-page',
    templateUrl: './alerts-page.html',
    imports: [
        AlertsListComponent,
        AsyncPipe,
        NotificationSettingsComponent,
        AlertsSummaryComponent
    ],
    styleUrls: ['./alerts-page.css']
})
export class AlertsPageComponent implements OnInit {
    // Estas son las dos propiedades que tu HTML necesita.
    // Probablemente faltan en tu archivo.
    activeAlerts$!: Observable<Alert[]>;
    notificationSettings$!: Observable<NotificationSettings>;
    alertsSummary$!: Observable<any>;
    constructor(private alertsService: AlertsService) {}

    ngOnInit(): void {
        // Aquí les asignamos los datos que vienen del servicio.
        this.activeAlerts$ = this.alertsService.getActiveAlerts();
        this.notificationSettings$ = this.alertsService.getNotificationSettings();
        this.alertsSummary$ = this.alertsService.getAlertsSummary();
    }

    handleDismiss(alertId: string): void {
        this.alertsService.dismissAlert(alertId);

    }
}