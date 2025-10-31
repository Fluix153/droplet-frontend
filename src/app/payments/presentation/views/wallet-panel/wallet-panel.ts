import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const http = inject(HttpClient);
export const wallet = signal<any>({});

effect(() => {
    http.get('/server/wallet').subscribe(data => wallet.set(data));
});

@Component({
    selector: 'app-wallet-panel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wallet-panel.html',
    styleUrls: ['./wallet-panel.css']
})
export class WalletPanelView {}
