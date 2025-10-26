import {Component, OnInit} from '@angular/core';
import {Tank} from '../../../domain/model/tank.entity';
import {InventoryService} from '../../../application/inventory.service';
import {MatCardImage} from '@angular/material/card';

@Component({
  selector: 'app-tank-list',
  imports: [
    MatCardImage
  ],
  templateUrl: './tank-list.html',
  styleUrl: './tank-list.css'
})
export class TankList implements OnInit {
  tanks: Tank[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getInventory().subscribe((data) => {
      this.tanks = data;
    });
  }



}
