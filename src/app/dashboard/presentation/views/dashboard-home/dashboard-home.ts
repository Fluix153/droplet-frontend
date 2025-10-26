import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.css'],
})
export class DashboardHomeComponent {
  cards = [
    { title: 'Card 1', content: 'This is the content of card 1.' },
    { title: 'Card 2', content: 'This is the content of card 2.' },
    { title: 'Card 3', content: 'This is the content of card 3.' },
  ];
}
