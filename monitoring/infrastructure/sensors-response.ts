import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';


export interface SensorResource extends BaseResource {
  id: number;
  DeviceCode: string;
  Type: string;
  Location: string;
  Status: string;
}

export interface SensorsResponse extends BaseResponse {
  sensors: SensorResource[];
}
