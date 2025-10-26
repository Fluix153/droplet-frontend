import { Injectable } from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {AlertsApiEndpoint} from './alerts-api-endpoint';
import {SensorsApiEndpoint} from './sensors-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Alert} from '../domain/model/alert.entity';
import {Sensor} from '../domain/model/sensor.entity';

@Injectable({
  providedIn: 'root'
})
export class MonitoringApi extends BaseApi{
  private readonly alertsEndpoint : AlertsApiEndpoint;
  private readonly sensorsEndpoint : SensorsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.alertsEndpoint = new AlertsApiEndpoint(http);
    this.sensorsEndpoint = new SensorsApiEndpoint(http);
  }


  // Alerts

  getAlerts() : Observable<Alert[]>{
    return this.alertsEndpoint.getAll();
  }

  getAlert(id:number) : Observable<Alert> {
    return this.alertsEndpoint.getById(id);
  }

  createAlert(alert: Alert): Observable<Alert>{
    return this.alertsEndpoint.create(alert);
  }

  updateAlert(alert: Alert): Observable<Alert>{
    return this.alertsEndpoint.update(alert, alert.id);
  }

  deleteAlert(id:number) : Observable<void>{
    return this.sensorsEndpoint.delete(id);
  }

  // creo q delete no hace falta

  // Sensors

  getSensors() : Observable<Sensor[]>{
    return this.sensorsEndpoint.getAll();
  }

  getSensor(id:number) : Observable<Sensor> {
    return this.sensorsEndpoint.getById(id);
  }

  createSensor(sensor: Sensor): Observable<Sensor>{
    return this.sensorsEndpoint.create(sensor);
  }

  updateSensor(sensor: Sensor): Observable<Sensor>{
    return this.sensorsEndpoint.update(sensor, sensor.id);
  }

  deleteSensor(id:number) : Observable<void>{
    return this.sensorsEndpoint.delete(id);
  }

}
