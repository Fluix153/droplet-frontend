import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatLiters', standalone: true })
export class FormatLitersPipe implements PipeTransform {
    transform(value: number | null | undefined): string {
        if (value == null) return '—';
        return `${value.toFixed(1)} L`;
    }
}
