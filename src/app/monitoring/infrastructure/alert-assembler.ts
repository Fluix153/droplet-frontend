import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Alert} from '../domain/model/alert.entity';
import {AlertResource, AlertsResponse} from './alerts-response';



export class AlertAssembler implements BaseAssembler<Alert, AlertResource, AlertsResponse>{


  toEntitiesFromResponse(response: AlertsResponse): Alert[] {
    console.log(response);
    return response.alerts.map(resource => this.toEntityFromResource(resource as AlertResource));
  }

  toEntityFromResource(resource: AlertResource): Alert {
    return new Alert({
      id: resource.id,
      UserId: resource.UserId,
      MetricType: resource.MetricType,
      Severity: resource.Severity,
      Message: resource.Message,
      TriggeredAt: resource.TriggeredAt,
    })
  }

  toResourceFromEntity(entity: Alert): AlertResource {
    return {
      id: entity.id,
      UserId: entity.userId,
      MetricType: entity.MetricType,
      Severity: entity.Severity,
      Message: entity.Message,
      TriggeredAt: entity.TriggeredAt
    } as AlertResource;
  }


}
