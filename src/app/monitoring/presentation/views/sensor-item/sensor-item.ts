import {Component, inject, input} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Sensor} from '../../../domain/model/sensor.entity';
import {
  MatCard,
  MatCardHeader,
  MatCardTitleGroup,
  MatCardSubtitle,
  MatCardTitle,
  MatCardImage, MatCardActions
} from '@angular/material/card';

@Component({
  selector: 'app-sensor-item',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardSubtitle,
    MatCardTitle,
    MatCardImage,
    MatCardActions
  ],
  templateUrl: './sensor-item.html',
  styleUrl: './sensor-item.css'
})
export class SensorItem {


  sensor = input.required<Sensor>();

  editSensor(sensor: Sensor) {

  }


}
