import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlertsSummaryComponent } from './alerts-summary';

describe('AlertsSummaryComponent', () => {
    let component: AlertsSummaryComponent;
    let fixture: ComponentFixture<AlertsSummaryComponent>;

    // Este bloque se ejecuta antes de cada prueba
    beforeEach(async () => {
        // Configura un módulo de pruebas de Angular
        await TestBed.configureTestingModule({
            declarations: [ AlertsSummaryComponent ]
        })
            .compileComponents();

        // Crea una instancia del componente
        fixture = TestBed.createComponent(AlertsSummaryComponent);
        component = fixture.componentInstance;
    });

    // Prueba 1: Verifica que el componente se pueda crear correctamente
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Prueba 2: Verifica que no se muestre nada si no hay datos de resumen
    it('should not display summary container if summary input is null', () => {
        // Arrange: No le pasamos ningún dato al @Input() 'summary'

        // Act: Detecta los cambios para renderizar el HTML
        fixture.detectChanges();

        // Assert: Busca el div principal y espera que no exista
        const container = fixture.debugElement.query(By.css('.summary-container'));
        expect(container).toBeNull();
    });

    // Prueba 3: Verifica que se muestren las tarjetas cuando se le pasan datos
    it('should display summary cards when summary input is provided', () => {
        // Arrange: Creamos datos simulados y se los pasamos al @Input()
        const mockSummary = {
            critical: 3,
            warnings: 7,
            info: 12,
            resolved: 15
        };
        component.summary = mockSummary;

        // Act: Detecta los cambios para renderizar el HTML
        fixture.detectChanges();

        // Assert: Buscamos los elementos y verificamos que existan y tengan el contenido correcto
        const cards = fixture.debugElement.queryAll(By.css('.summary-card'));
        const criticalCountEl = fixture.debugElement.query(By.css('.summary-card.critical .count'));

        expect(cards.length).toBe(4); // Espera que haya 4 tarjetas
        expect(criticalCountEl.nativeElement.textContent.trim()).toBe('3'); // Espera que el conteo de alertas críticas sea 3
    });
});