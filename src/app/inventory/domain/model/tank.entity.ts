import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export interface Tank extends BaseEntity {
  id: number;
  name: string;
  level : number;
  needRefill: boolean;
}
