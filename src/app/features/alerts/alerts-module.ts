import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsRoutingModule } from './alerts-routing-module';
import {FormsModule} from "@angular/forms";
import {AlertsPageComponent} from "./components/alerts-page/alerts-page";
import {AlertsListComponent} from "./components/alerts-list/alerts-list";
import {NotificationSettingsComponent} from "./components/notification-settings/notification-settings";
import {AlertsSummaryComponent} from "./components/alerts-summary/alerts-summary";


@NgModule({
  declarations: [
      ],
    imports: [
        CommonModule,
        AlertsRoutingModule,
        FormsModule,
        AlertsPageComponent,
        AlertsListComponent,
        NotificationSettingsComponent,
        AlertsSummaryComponent,
    ]
})
export class AlertsModule { }
