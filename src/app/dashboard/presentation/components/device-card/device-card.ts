import { Component, Input } from '@angular/core';
import { DeviceStatus } from 'app/dashboard/domain/model/device-status.entity';
import { BatteryStatusPipe } from 'shared/pipes/battery-status.pipe';
import { FormatLitersPipe } from 'shared/pipes/format-liters.pipe';


@Component({
    selector: 'dashboard-device-card',
    standalone: true,
    imports: [BatteryStatusPipe, FormatLitersPipe, BatteryStatusPipe, FormatLitersPipe],
    templateUrl: './device-card.html',
    styleUrls: ['./device-card.css']
})
export class DeviceCardComponent {
    @Input() device!: DeviceStatus;
}
