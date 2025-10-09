import { Component, Input, Output, EventEmitter } from '@angular/core'; // Añade Output y EventEmitter
import { Alert } from '../../models/alert.model';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-alerts-list',
    templateUrl: './alerts-list.html',
    imports: [
        NgClass
    ],
    styleUrls: ['./alerts-list.css'],
})
export class AlertsListComponent {
    @Input() alerts: Alert[] | null = [];
    @Output() alertDismissed = new EventEmitter<string>(); // Evento de salida

    // Función que se llamará desde el HTML
    onDismiss(alertId: string): void {
        this.alertDismissed.emit(alertId);
    }

    protected readonly alert = alert;
}
