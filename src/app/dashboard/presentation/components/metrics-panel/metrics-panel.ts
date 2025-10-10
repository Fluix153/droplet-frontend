import { Component, Input } from '@angular/core';
import { DashboardMetrics } from 'app/dashboard/domain/model/dashboard-metrics.entity';
import { FormatLitersPipe } from 'shared/pipes/format-liters.pipe';
import { FormatTemperaturePipe } from 'shared/pipes/format-temperature.pipe';

@Component({
    selector: 'dashboard-metrics-panel',
    standalone: true,
    imports: [FormatLitersPipe, FormatTemperaturePipe, FormatLitersPipe, FormatTemperaturePipe],
    templateUrl: './metrics-panel.html',
    styleUrls: ['./metrics-panel.css']
})
export class MetricsPanelComponent {
    @Input() metrics!: DashboardMetrics;
}
