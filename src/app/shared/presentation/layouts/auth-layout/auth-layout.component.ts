import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSwitcher } from '../../components/language-switcher/language-switcher';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, LanguageSwitcher],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {
  // Lógica del componente (si aplica)
}
