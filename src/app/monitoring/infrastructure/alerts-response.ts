import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';


export interface AlertResource extends BaseResource {
  id: number;
  UserId: number;
  MetricType: string;
  Severity: string;
  Message: string;
  TriggeredAt: string;

}

export interface AlertsResponse extends BaseResponse {
  alerts: AlertResource[];
}
