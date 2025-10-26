import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Sensor} from '../domain/model/sensor.entity';
import {SensorResource, SensorsResponse} from './sensors-response';
import {SensorAssembler} from './sensor-assembler';

export class SensorsApiEndpoint extends
  BaseApiEndpoint<Sensor, SensorResource, SensorsResponse, SensorAssembler>{
  constructor(http: HttpClient) {
    super(http,`${environment.platformProviderApiBaseUrl}${environment.platformProviderSensorsEndpoint}`,
      new SensorAssembler());
  }
}
