import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatTemperature', standalone: true })
export class FormatTemperaturePipe implements PipeTransform {
    transform(value: number | null | undefined): string {
        if (value == null) return '—';
        return `${value.toFixed(1)} °C`;
    }
}
