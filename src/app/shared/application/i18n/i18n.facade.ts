import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class I18nFacade {
  /** Idioma actual */
  currentLang = signal<string>('en');

  /** Lista de idiomas disponibles */
  availableLangs = ['en', 'es'];

  constructor(private translate: TranslateService) {
    // Detectar el idioma del navegador o cargar el idioma guardado
    const browserLang = this.translate.getBrowserLang() || 'en'; // Asegurar que siempre sea un string
    const savedLang = localStorage.getItem('language') || 'en'; // Asegurar que siempre sea un string
    const defaultLang = this.availableLangs.includes(savedLang) ? savedLang : (this.availableLangs.includes(browserLang) ? browserLang : 'en');

    this.changeLanguage(defaultLang);
  }

  /** Cambiar el idioma */
  changeLanguage(lang: string): void {
    if (this.availableLangs.includes(lang)) {
      this.translate.use(lang);
      this.currentLang.set(lang);
      localStorage.setItem('language', lang); // Guardar el idioma seleccionado
    }
  }
}
