import {inject, Injectable, signal} from '@angular/core';
import { DashboardApi } from '../infrastructure/dashboard-api';
import { DashboardMetrics } from '../domain/model/dashboard-metrics.entity';
import { DeviceStatus } from '../domain/model/device-status.entity';
import { IrrigationStatus } from '../domain/model/irrigation-status.entity';

@Injectable({ providedIn: 'root' })
export class DashboardStore {
    private readonly api = inject(DashboardApi);

    readonly metrics = signal<DashboardMetrics | null>(null);
    readonly devices = signal<DeviceStatus[]>([]);
    readonly irrigation = signal<IrrigationStatus | null>(null);
    readonly loading = signal<boolean>(false);

    loadAll() {
        this.loading.set(true);

        this.api.getMetrics().subscribe(metrics => this.metrics.set(metrics));
        this.api.getDevices().subscribe(devices => this.devices.set(devices));
        this.api.getIrrigation().subscribe(irrigation => {
            this.irrigation.set(irrigation);
            this.loading.set(false);
        });
    }

    scheduleIrrigation(time: string) {
        this.api.scheduleIrrigation(time).subscribe(() => {
            console.log('Irrigation scheduled successfully');
        });
    }
}
