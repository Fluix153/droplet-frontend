import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-wallet-panel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wallet-panel.html',
    styleUrls: ['./wallet-panel.css']
})
export class WalletPanelView {
    balance = 125.75;
    rewardsPoints = 2340;
    cashbackRate = 2.5;
    nextReward = 5.0;

    addFunds() {
        console.log('Add Funds clicked');
    }

    withdraw() {
        console.log('Withdraw clicked');
    }
}
