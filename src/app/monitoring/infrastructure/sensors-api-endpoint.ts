import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Sensor } from '../domain/model/sensor.entity';
import { SensorResource, SensorsResponse } from './sensors-response';
import { SensorAssembler } from './sensor-assembler';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensorsApiEndpoint extends BaseApiEndpoint<
  Sensor,
  SensorResource,
  SensorsResponse,
  SensorAssembler
> {
  constructor(http: HttpClient, assembler: SensorAssembler) {
    super(http, `${environment.monitoring.apiBaseUrl}${environment.monitoring.sensorsEndpoint}`, assembler);
  }
}
