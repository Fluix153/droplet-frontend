import {Component, OnInit} from '@angular/core';
import {TankList} from '../tank-list/tank-list';
import {Savings} from '../savings/savings';
import {NeedRefill} from '../need-refill/need-refill';
import {AddTank} from '../add-tank/add-tank';

@Component({
  selector: 'app-inventory-page',
  imports: [
    TankList,
    Savings,
    NeedRefill,
    AddTank
  ],
  templateUrl: './inventory-page.html',
  styleUrl: './inventory-page.css'
})
export class InventoryPage implements OnInit {
  constructor() {  }

  ngOnInit() :void{}

}
