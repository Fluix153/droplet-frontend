import { Component } from '@angular/core';

@Component({
    selector: 'shared-loading-spinner',
    standalone: true,
    template: `<div class="spinner"></div>`,
    styleUrls: ['./loading-spinner.css']
})
export class LoadingSpinnerComponent {}
