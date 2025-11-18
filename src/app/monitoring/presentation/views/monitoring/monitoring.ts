import {Component, inject} from '@angular/core';
import {MonitoringStore} from '../../../application/monitoring.store';
import {SensorList} from '../sensor-list/sensor-list';

@Component({
  selector: 'app-monitoring',
  imports: [
    SensorList
  ],
  templateUrl: './monitoring.html',
  styleUrl: './monitoring.css'
})
export class Monitoring {

  protected store = inject(MonitoringStore);
  protected readonly sensors = this.store.sensors;



}
