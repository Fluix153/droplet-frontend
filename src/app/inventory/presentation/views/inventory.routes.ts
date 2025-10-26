import { Routes } from '@angular/router';

const inventoryPage = () =>
  import('../components/inventory-page/inventory-page').then(m => m.InventoryPage);

export const INVENTORY_ROUTES: Routes = [
  { path: '', loadComponent: inventoryPage }
];
