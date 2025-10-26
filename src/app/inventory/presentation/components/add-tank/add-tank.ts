import { Component } from '@angular/core';
import {Tank} from '../../../domain/model/tank.entity';
import {InventoryService} from '../../../application/inventory.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-tank',
  imports: [
    FormsModule
  ],
  templateUrl: './add-tank.html',
  styleUrl: './add-tank.css'
})
export class AddTank {
  newTank: Tank = {
    id: 0,
    name: '',
    level: 0,
    needRefill: false,
  };

  constructor(private inventoryService: InventoryService) {}

  addTank(): void {
    this.inventoryService.addTank(this.newTank).subscribe((tank) => {
      console.log('Tanque agregado:', tank);

      this.newTank = { id: 0, name: '', level: 0, needRefill: false };
    });
  }

}
