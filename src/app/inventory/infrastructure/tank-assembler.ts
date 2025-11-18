import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Tank } from '../domain/model/tank.entity';
import { TankResource, TanksResponse } from './tanks-response';

@Injectable({
  providedIn: 'root'
})
export class TankAssembler implements BaseAssembler<Tank, TankResource, TanksResponse> {
  toEntityFromResource(resource: TankResource): Tank {
    return {
      id: Number(resource.id),
      name: resource.name,
      level: resource.level,
      needRefill: resource.needRefill
    };
  }

  toResourceFromEntity(entity: Tank): TankResource {
    return {
      id: entity.id,
      name: entity.name,
      level: entity.level,
      needRefill: entity.needRefill
    };
  }

  toEntitiesFromResponse(response: TanksResponse): Tank[] {
    if (!response?.data) {
      return [];
    }
    return response.data.map(resource => this.toEntityFromResource(resource));
  }
}
