import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface SupportTicket {
  id: number;
  ticketNumber: string;
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-support-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  templateUrl: './support-card.html',
  styleUrls: ['./support-card.css']
})
export class SupportCardLeftComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  ticketForm!: FormGroup;
  isLoading = false;
  tickets$: Observable<SupportTicket[]> = of([]);

  ngOnInit(): void {
    this.createForm();
    this.loadTickets();
  }

  private createForm(): void {
    this.ticketForm = this.formBuilder.group({
      subject: ['', [Validators.required, Validators.minLength(5)]],
      priority: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private loadTickets(): void {
    // Simulación de tickets para demostración
    const mockTickets: SupportTicket[] = [
      {
        id: 1,
        ticketNumber: 'TK-2025-001',
        subject: 'Login Issues',
        description: 'Unable to login with correct credentials',
        priority: 'High',
        status: 'Open',
        createdAt: new Date('2025-01-08'),
        updatedAt: new Date('2025-01-08')
      },
      {
        id: 2,
        ticketNumber: 'TK-2025-002',
        subject: 'Recipe Not Saving',
        description: 'Recipe data is not being saved properly',
        priority: 'Medium',
        status: 'In Progress',
        createdAt: new Date('2025-01-07'),
        updatedAt: new Date('2025-01-09')
      },
      {
        id: 3,
        ticketNumber: 'TK-2025-003',
        subject: 'Dashboard Performance',
        description: 'Dashboard is loading slowly',
        priority: 'Low',
        status: 'Resolved',
        createdAt: new Date('2025-01-05'),
        updatedAt: new Date('2025-01-06')
      }
    ];

    // Simular carga con delay
    this.tickets$ = of(mockTickets).pipe(delay(1000));
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      this.isLoading = true;

      const formData = this.ticketForm.value;
      console.log('Support ticket submitted:', formData);

      // Simulación de envío
      setTimeout(() => {
        this.isLoading = false;
        this.ticketForm.reset();

        // Aquí puedes agregar la lógica para enviar al backend
        // this.supportService.createTicket(formData).subscribe({
        //   next: (response) => {
        //     console.log('Ticket created successfully', response);
        //     this.loadTickets(); // Recargar la lista de tickets
        //   },
        //   error: (error) => {
        //     console.error('Error creating ticket', error);
        //     this.isLoading = false;
        //   }
        // });

        // Recargar tickets después de crear uno nuevo
        this.loadTickets();
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.ticketForm.controls).forEach(key => {
      const control = this.ticketForm.get(key);
      control?.markAsTouched();
    });
  }

  getChipColor(status: string): 'primary' | 'accent' | 'warn' {
    switch (status) {
      case 'Open':
        return 'primary';
      case 'In Progress':
        return 'accent';
      case 'Resolved':
        return 'primary';
      case 'Closed':
        return 'warn';
      default:
        return 'primary';
    }
  }
}
