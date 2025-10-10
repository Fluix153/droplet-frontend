import {Routes} from '@angular/router';
//import {Monitoring} from './monitoring/monitoring';


const monitoring =()=> import('./monitoring/monitoring')
  .then(m => m.Monitoring);


const sensorList =()=> import('./sensor-list/sensor-list')
  .then(m => m.SensorList);

const sensorEdit =()=> import('./sensor-edit/sensor-edit')
  .then(m => m.SensorEdit);



export const monitoringRoutes: Routes = [
  {path: 'sensors',loadComponent: sensorList},
  {path: 'sensors/edit/:id', loadComponent: sensorEdit}
]
