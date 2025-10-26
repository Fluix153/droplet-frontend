
import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Sensor } from '../domain/model/sensor.entity';
import { SensorResource, SensorsResponse } from './sensors-response';

@Injectable({
  providedIn: 'root'
})
export class SensorAssembler implements BaseAssembler<Sensor, SensorResource, SensorsResponse> {
  toEntitiesFromResponse(response: SensorsResponse): Sensor[] {
    if (!response?.sensors) {
      return [];
    }
    return response.sensors.map(resource => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: SensorResource): Sensor {
    return Sensor.create({
      id: Number(resource.id),
      DeviceCod: resource.DeviceCode,
      Type: resource.Type,
      Location: resource.Location,
      Status: resource.Status
    });
  }

  toResourceFromEntity(entity: Sensor): SensorResource {
    return {
      id: entity.id,
      DeviceCode: entity.DeviceCod,
      Type: entity.Type,
      Location: entity.Location,
      Status: entity.Status
    };
  }
}
