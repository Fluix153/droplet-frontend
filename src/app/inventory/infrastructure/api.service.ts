import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Tank} from '../domain/model/tank.entity';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3001/tanks';

  constructor(private http: HttpClient) {}

  getInventory(): Observable<Tank[]> {
    return this.http.get<Tank[]>(this.apiUrl);
  }

  addTank(tank: Tank): Observable<Tank> {
    return this.http.post<Tank>(this.apiUrl, tank);
  }
}
