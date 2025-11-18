import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Alert } from '../domain/model/alert.entity';
import { AlertResource, AlertsResponse } from './alerts-response';
import { AlertAssembler } from './alert-assembler';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertsApiEndpoint extends BaseApiEndpoint<
  Alert,
  AlertResource,
  AlertsResponse,
  AlertAssembler
> {
  constructor(http: HttpClient, assembler: AlertAssembler) {
    super(http, `${environment.monitoring.apiBaseUrl}${environment.monitoring.alertsEndpoint}`, assembler);
  }
}
