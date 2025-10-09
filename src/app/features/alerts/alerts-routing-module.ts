import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsPageComponent } from './components/alerts-page/alerts-page';

const routes: Routes = [
    {
        path: '',
        component: AlertsPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlertsRoutingModule { }