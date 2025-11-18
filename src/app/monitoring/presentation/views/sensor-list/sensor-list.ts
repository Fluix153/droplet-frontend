import {Component, inject, input} from '@angular/core';
import {Sensor} from '../../../domain/model/sensor.entity';
import {SensorItem} from '../sensor-item/sensor-item';
import {MonitoringStore} from '../../../application/monitoring.store';

@Component({
  selector: 'app-sensor-list',
  imports: [
    SensorItem
  ],
  templateUrl: './sensor-list.html',
  styleUrl: './sensor-list.css'
})
export class SensorList {


  sensors = input.required<Array<Sensor>>();

}
