import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DASHBOARD_STORE } from 'app/dashboard/application/dashboard-store.token';
import { DashboardStore } from 'app/dashboard/application/dashboard.store'; // ✅ solo para el provider

import { MetricsPanelComponent } from '../../components/metrics-panel/metrics-panel';
import { DeviceCardComponent } from '../../components/device-card/device-card';
import { IrrigationControlComponent } from '../../components/irrigation-control/irrigation-control';
import { CardWrapperComponent } from 'shared/components/card-wrapper/card-wrapper';
import { LoadingSpinnerComponent } from 'shared/components/loading-spinner/loading-spinner';

@Component({
    selector: 'dashboard-view',
    standalone: true,
    imports: [
        CommonModule,
        MetricsPanelComponent,
        DeviceCardComponent,
        IrrigationControlComponent,
        CardWrapperComponent,
        LoadingSpinnerComponent
    ],
    providers: [
        { provide: DASHBOARD_STORE, useClass: DashboardStore }
    ],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css']
})
export class DashboardView {
    readonly store = inject(DASHBOARD_STORE);
    protected readonly Date = Date;
}
