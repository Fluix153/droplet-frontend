import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Tank} from '../domain/model/tank.entity';
import { TanksApiEndpoint } from './tanks-api-endpoint';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly tanksEndpoint: TanksApiEndpoint) {}

  getInventory(): Observable<Tank[]> {
    return this.tanksEndpoint.getAll();
  }

  addTank(tank: Tank): Observable<Tank> {
    return this.tanksEndpoint.create(tank);
  }
}
