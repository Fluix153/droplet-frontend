import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MonitoringStore} from '../../../application/monitoring.store';
import {Sensor} from '../../../domain/model/sensor.entity';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-sensor-edit',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatLabel,
    MatError
  ],
  templateUrl: './sensor-edit.html',
  styleUrl: './sensor-edit.css'
})
export class SensorEdit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(MonitoringStore);


  form = this.fb.group({
    DeviceCode: new FormControl<string>('',{nonNullable: true, validators: [Validators.required]}),
    Type: new FormControl<string>('',{nonNullable: true, validators: [Validators.required]}),
    Location: new FormControl<string>('',{nonNullable: true, validators: [Validators.required]}),
    Status: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]})
  });
  sensors= this.store.sensors;
  isEditMode = false;
  sensorId: number | null = null;

  constructor(){
    this.route.params.subscribe(params => {
      this.sensorId = params['id'] ? +params['id'] : null;
      this.isEditMode = !!this.sensorId;
      if(this.isEditMode){
        const sensor = this.store.sensors().find(sensor => sensor.id === this.sensorId);
        if(sensor){
          this.form.patchValue({
            DeviceCode: sensor.DeviceCod,
            Type: sensor.Type,
            Location: sensor.Location,
            Status: sensor.Status
          });
        }
      }
    })
  }

  submit(){
    if(this.form.invalid) return;
    const sensor = Sensor.create({
      id: this.sensorId ?? 0,
      DeviceCod: this.form.value.DeviceCode!,
      Type: this.form.value.Type!,
      Location: this.form.value.Location!,
      Status: this.form.value.Status!
    });

    if(this.isEditMode){
      this.store.updateSensor(sensor);
    } else {
      this.store.addSensor(sensor);
    }
    this.router.navigate(['/monitoring']).then();

  }

}
