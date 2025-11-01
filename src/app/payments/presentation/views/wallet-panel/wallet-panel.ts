import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-wallet-panel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wallet-panel.html',
    styleUrls: ['./wallet-panel.css']
})
export class WalletPanelView {
    private http = inject(HttpClient);
    wallet = signal<any>({});

    constructor() {
        effect(() => {
            this.http.get('http://localhost:3000/wallet').subscribe(data => this.wallet.set(data));
        });
    }
}
