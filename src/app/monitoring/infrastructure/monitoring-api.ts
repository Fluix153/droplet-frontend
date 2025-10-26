import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertsApiEndpoint } from './alerts-api-endpoint';
import { SensorsApiEndpoint } from './sensors-api-endpoint';
import { Alert } from '../domain/model/alert.entity';
import { Sensor } from '../domain/model/sensor.entity';

@Injectable({
  providedIn: 'root'
})
export class MonitoringApi {
  constructor(
    private readonly alertsEndpoint: AlertsApiEndpoint,
    private readonly sensorsEndpoint: SensorsApiEndpoint
  ) {}

  getAlerts(): Observable<Alert[]> {
    return this.alertsEndpoint.getAll();
  }

  getAlert(id: number): Observable<Alert> {
    return this.alertsEndpoint.getById(id);
  }

  createAlert(alert: Alert): Observable<Alert> {
    return this.alertsEndpoint.create(alert);
  }

  updateAlert(alert: Alert): Observable<Alert> {
    return this.alertsEndpoint.update(alert, alert.id);
  }

  deleteAlert(id: number): Observable<void> {
    return this.alertsEndpoint.delete(id);
  }

  getSensors(): Observable<Sensor[]> {
    return this.sensorsEndpoint.getAll();
  }

  getSensor(id: number): Observable<Sensor> {
    return this.sensorsEndpoint.getById(id);
  }

  createSensor(sensor: Sensor): Observable<Sensor> {
    return this.sensorsEndpoint.create(sensor);
  }

  updateSensor(sensor: Sensor): Observable<Sensor> {
    return this.sensorsEndpoint.update(sensor, sensor.id);
  }

  deleteSensor(id: number): Observable<void> {
    return this.sensorsEndpoint.delete(id);
  }
}
