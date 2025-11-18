import { Routes } from '@angular/router';

export const PAYMENTS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./payments/payments').then(m => m.PaymentsView)
    },
    {
        path: 'methods',
        loadComponent: () => import('./method-selector/method-selector').then(m => m.MethodSelectorView)
    },
    {
        path: 'transactions',
        loadComponent: () => import('./transaction-list/transaction-list').then(m => m.TransactionListView)
    },
    {
        path: 'settings',
        loadComponent: () => import('./billing-settings/billing-settings').then(m => m.BillingSettingsView)
    },
    {
        path: 'wallet',
        loadComponent: () => import('./wallet-panel/wallet-panel').then(m => m.WalletPanelView)
    }
];
