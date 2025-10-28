import { Component, inject } from '@angular/core';
import { PaymentsStore } from '../../../application/payments.store';

@Component({
    selector: 'app-wallet-panel',
    templateUrl: './wallet-panel.html',
    styleUrls: ['./wallet-panel.css'],
})
export class WalletPanelComponent {
    private readonly store = inject(PaymentsStore);
    readonly wallet = this.store.wallet;
}
