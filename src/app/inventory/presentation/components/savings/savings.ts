import {Component, OnInit} from '@angular/core';
import {Tank} from '../../../domain/model/tank.entity';
import {InventoryService} from '../../../application/inventory.service';

@Component({
  selector: 'app-savings',
  imports: [],
  templateUrl: './savings.html',
  styleUrl: './savings.css'
})
export class Savings implements OnInit {
  totalSavings: number = 0;
  tanks: Tank[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getInventory().subscribe((data) => {
      this.tanks = data;
      this.calculateSavings();
    });
  }

  calculateSavings(): void {

    const refilledTanks = this.tanks.filter((tank) => tank.needRefill);
    this.totalSavings = refilledTanks.length * 50; // cada tanque recargado ahorra 50 soles
  }

}
