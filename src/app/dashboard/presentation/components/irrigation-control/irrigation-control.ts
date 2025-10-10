import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IrrigationStatus } from 'app/dashboard/domain/model/irrigation-status.entity';

@Component({
    selector: 'dashboard-irrigation-control',
    standalone: true,
    templateUrl: './irrigation-control.html',
    styleUrls: ['./irrigation-control.css']
})
export class IrrigationControlComponent {
    @Input() status!: IrrigationStatus;
    @Output() scheduleNow = new EventEmitter<void>();

    toggleManualOverride() {
        this.scheduleNow.emit();
    }
}
