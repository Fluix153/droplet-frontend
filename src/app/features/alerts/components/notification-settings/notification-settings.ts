import {Component, Input} from '@angular/core';
import {NotificationSettings} from "../../models/alert.model";
import {AlertsService} from "../../../../core/services/alerts";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-notification-settings',
    templateUrl: './notification-settings.html',
    imports: [
        FormsModule
    ],
    styleUrls: ['./notification-settings.css']
})
export class NotificationSettingsComponent {
    @Input() settings: NotificationSettings | null = null;

    constructor(private alertsService: AlertsService) {}

    onSave() {
        if (this.settings) {
            this.alertsService.saveNotificationSettings(this.settings).subscribe(() => {
                alert('Settings saved successfully!');
            });
        }
    }
}