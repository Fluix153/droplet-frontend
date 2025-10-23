import {Component, inject} from '@angular/core';
import {I18nFacade} from '../../../application/i18n/i18n.facade';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  templateUrl: './language-switcher.html',
  styleUrls: ['./language-switcher.css']
})
export class LanguageSwitcher {
  /** Idioma actual */
  currentLang: string;

  /** Idiomas disponibles */
  languages: string[];

  /** Inyección del facade */
  private i18nFacade = inject(I18nFacade);

  constructor() {
    // Inicializar las propiedades después de inyectar el facade
    this.currentLang = this.i18nFacade.currentLang();
    this.languages = this.i18nFacade.availableLangs;
  }

  /** Cambiar el idioma */
  useLanguage(language: string): void {
    this.i18nFacade.changeLanguage(language);
  }
}
