import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface TankResource extends BaseResource {
  name: string;
  level: number;
  needRefill: boolean;
}

export interface TanksResponse extends BaseResponse {
  data?: TankResource[];
}
