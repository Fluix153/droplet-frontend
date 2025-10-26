import {Component, OnInit} from '@angular/core';
import {Tank} from '../../../domain/model/tank.entity';
import {InventoryService} from '../../../application/inventory.service';

@Component({
  selector: 'app-need-refill',
  imports: [],
  templateUrl: './need-refill.html',
  styleUrl: './need-refill.css'
})
export class NeedRefill implements OnInit {
  tanksToRefill: Tank[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getInventory().subscribe((data) => {
      this.tanksToRefill = data.filter((tank) => tank.needRefill);
    });
  }

}
