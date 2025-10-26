import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface UserResource extends BaseResource {
  name: string;
  email: string;
  role: string;
  phone?: string;
  password?: string;
}

export interface UsersResponse extends BaseResponse {
  data?: UserResource[];
}
