import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-alerts-summary',
    templateUrl: './alerts-summary.html',
    styleUrls: ['./alerts-summary.css']
})
export class AlertsSummaryComponent {
    @Input() summary: any;
}