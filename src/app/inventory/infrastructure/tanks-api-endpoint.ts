import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiEndpointService } from '../../shared/infrastructure/base-api-endpoint.service';
import { Tank } from '../domain/model/tank.entity';
import { TankAssembler } from './tank-assembler';
import { TankResource, TanksResponse } from './tanks-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TanksApiEndpoint extends BaseApiEndpointService<
  Tank,
  TankResource,
  TanksResponse,
  TankAssembler
> {
  constructor(http: HttpClient, assembler: TankAssembler) {
    super(http, `${environment.apiBaseUrl}/tanks`, assembler);
  }
}
