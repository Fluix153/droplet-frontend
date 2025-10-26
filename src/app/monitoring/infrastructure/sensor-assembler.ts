
import {BaseAssembler} from '../../shared/infrastructure/base-assembler';

import {Sensor} from '../domain/model/sensor.entity';
import {SensorResource, SensorsResponse} from './sensors-response';


export class SensorAssembler implements BaseAssembler<Sensor, SensorResource, SensorsResponse>{


  toEntitiesFromResponse(response: SensorsResponse): Sensor[] {
    console.log(response);
    return response.sensors.map(resource => this.toEntityFromResource(resource as SensorResource));
  }

  toEntityFromResource(resource: SensorResource): Sensor {
    return new Sensor({
      id: resource.id,
      DeviceCod: resource.DeviceCode,
      Type: resource.Type,
      Location: resource.Location,
      Status: resource.Status,
    })
  }

  toResourceFromEntity(entity: Sensor): SensorResource {
    return {
      id: entity.id,
      DeviceCode: entity.DeviceCod,
      Type: entity.Type,
      Location: entity.Location,
      Status: entity.Status
    } as SensorResource;
  }


}
