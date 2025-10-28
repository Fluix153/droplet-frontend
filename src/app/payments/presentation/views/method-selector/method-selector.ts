import { Component, inject } from '@angular/core';
import { PaymentsStore } from '../../../application/payments.store';
import {NgForOf, NgIf} from "@angular/common";


@Component({
    selector: 'app-method-selector',
    standalone: true,
    templateUrl: './method-selector.html',
    styleUrls: ['./method-selector.css'],
    imports: [
        NgIf,
        NgForOf
    ]
})
export class MethodSelectorComponent {
    private readonly store = inject(PaymentsStore);
    readonly getMethods = this.store.paymentMethods;

    methods() {
        return undefined;
    }
}
