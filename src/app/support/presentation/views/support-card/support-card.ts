import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SupportStore } from '../../../application/support.store';
import { SupportTicket, TicketStatus } from '../../../domain/models/support.entity';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-support-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatOptionModule
  ],
  templateUrl: './support-card.html',
  styleUrls: ['./support-card.css']
})
export class SupportCardComponent implements OnInit, OnDestroy {
  private readonly store = inject(SupportStore);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();

  // Observables del store asignados a propiedades públicas
  public readonly tickets$: Observable<SupportTicket[]> = this.store.tickets$;
  public readonly isLoading$: Observable<boolean> = this.store.isLoading$;

  // Propiedades para el template
  public isLoading = false;

  // Formulario para crear nuevo ticket
  public ticketForm: FormGroup;

  constructor() {
    this.ticketForm = this.formBuilder.group({
      subject: ['', [Validators.required, Validators.minLength(5)]],
      priority: ['Medium', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Cargar tickets al inicializar el componente
    this.store.loadTickets();

    // Suscribirse al estado de loading con gestión de memory leaks
    this.isLoading$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(loading => {
      this.isLoading = loading;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Maneja el envío del formulario para crear un nuevo ticket
   */
  onSubmit(): void {
    if (this.ticketForm.valid) {
      const formData = this.ticketForm.value;

      // Delegar la creación del ticket al store
      this.store.createTicket({
        subject: formData.subject,
        priority: formData.priority,
        description: formData.description
      });

      // Resetear el formulario después de enviar
      this.ticketForm.reset({
        subject: '',
        priority: 'Medium',
        description: ''
      });
    }
  }

  /**
   * Obtiene el color del chip según el estado del ticket
   */
  getChipColor(status: TicketStatus): string {
    const colors = {
      'Open': 'accent',
      'In Progress': 'primary',
      'Solved': 'primary',
      'Closed': ''
    };
    return colors[status] || '';
  }
}