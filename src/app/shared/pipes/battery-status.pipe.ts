import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'batteryStatus', standalone: true })
export class BatteryStatusPipe implements PipeTransform {
    transform(battery: number | null | undefined): string {
        if (battery == null) return '—';
        if (battery >= 80) return '🔋 Excelente';
        if (battery >= 50) return '🔋 Buena';
        if (battery >= 20) return '🔋 Baja';
        return '⚠️ Crítica';
    }
}
