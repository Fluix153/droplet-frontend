import {computed, Injectable, Signal, signal} from '@angular/core';
import {Alert} from '../domain/model/alert.entity';
import {Sensor} from '../domain/model/sensor.entity';
import {MonitoringApi} from '../infrastructure/monitoring-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitoringStore {

  readonly alertCount = computed(()=> this.alerts().length);
  readonly sensorCount = computed(()=> this.sensors().length);

  private readonly alertsSignal = signal<Alert[]>([]);
  private readonly sensorsSignal = signal<Sensor[]>([]);


  readonly alerts = this.alertsSignal.asReadonly();
  readonly sensors = this.sensorsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }

  constructor(private monitoringApi: MonitoringApi){
    this.loadAlerts();
    this.loadSensors();
  }

  /**
   * Loads alerts from the API and updates the store
   * @private
   */
  private loadAlerts(){
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi.getAlerts().pipe(takeUntilDestroyed()).subscribe({
      next: alerts => {
        this.alertsSignal.set(alerts);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load alerts'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Load sensors from the API and updates the store
   * @private
   */
  private loadSensors(){
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi.getSensors().pipe(takeUntilDestroyed()).subscribe({
      next: sensors => {
        this.sensorsSignal.set(sensors);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load sensors'));
        this.loadingSignal.set(false);
      }
    });
  }

  getAlertById(id: number | null | undefined) : Signal<Alert |  undefined> {
    return computed(()=> id ? this.alerts().find(c => c.id === id) : undefined);
  }

  getSensorById(id: number | null | undefined) : Signal<Sensor |  undefined> {
    return computed(()=> id ? this.sensors().find(c => c.id === id) : undefined);
  }

  addAlert(alert: Alert) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi.createAlert(alert).pipe(retry(2)).subscribe({
      next: createdAlert => {
        this.alertsSignal.update(alerts => [...alerts, createdAlert]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create alert'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateAlert(updatedAlert: Alert) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi.updateAlert(updatedAlert).pipe(retry(2)).subscribe({
      next: alert => {
        this.alertsSignal.update(alerts =>
          alerts.map(c => c.id === alert.id ? alert : c)
        );
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update alert'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteAlert(id: number) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi.deleteAlert(id).pipe(retry(2)).subscribe({
      next: () => {
        this.alertsSignal.update(alerts =>
          alerts.filter(c => c.id !== id ));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete alert'));
        this.loadingSignal.set(false);
      }
    });
  }

  addSensor(sensor: Sensor) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi.createSensor(sensor).pipe(retry(2)).subscribe({
      next: createdSensor => {
        this.sensorsSignal.update(sensors => [...sensors, createdSensor]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create sensor'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateSensor(updatedSensor: Sensor) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi.updateSensor(updatedSensor).pipe(retry(2)).subscribe({
      next: sensor => {
        this.sensorsSignal.update(sensors =>
          sensors.map(c => c.id === sensor.id ? sensor : c)
        );
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update sensor'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteSensor(id: number) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.monitoringApi.deleteSensor(id).pipe(retry(2)).subscribe({
      next: () => {
        this.sensorsSignal.update(sensors =>
          sensors.filter(c => c.id !== id ));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete sensor'));
        this.loadingSignal.set(false);
      }
    });
  }






}
