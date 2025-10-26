import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Alert } from '../domain/model/alert.entity';
import { AlertResource, AlertsResponse } from './alerts-response';

@Injectable({
  providedIn: 'root'
})
export class AlertAssembler implements BaseAssembler<Alert, AlertResource, AlertsResponse> {
  toEntitiesFromResponse(response: AlertsResponse): Alert[] {
    if (!response?.alerts) {
      return [];
    }
    return response.alerts.map(resource => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: AlertResource): Alert {
    return Alert.create({
      id: Number(resource.id),
      UserId: resource.UserId,
      MetricType: resource.MetricType,
      Severity: resource.Severity,
      Message: resource.Message,
      TriggeredAt: resource.TriggeredAt
    });
  }

  toResourceFromEntity(entity: Alert): AlertResource {
    return {
      id: entity.id,
      UserId: entity.UserId,
      MetricType: entity.MetricType,
      Severity: entity.Severity,
      Message: entity.Message,
      TriggeredAt: entity.TriggeredAt.toISOString()
    };
  }
}
