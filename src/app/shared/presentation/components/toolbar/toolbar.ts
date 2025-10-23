import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    LanguageSwitcher
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})

export class ToolbarComponent {

}
