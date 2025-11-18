import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../infrastructure/api.service';
import {Tank} from '../domain/model/tank.entity';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private apiService: ApiService) {}

  getInventory(): Observable<Tank[]> {
    return this.apiService.getInventory();
  }

  addTank(tank: Tank): Observable<Tank> {
    return this.apiService.addTank(tank);
  }
}
