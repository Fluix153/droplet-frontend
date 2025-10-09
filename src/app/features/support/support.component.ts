import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';
import {SupportService} from './services/support.service';
import {AuthService} from '../auth/auth.service';
import {SupportTicket} from './models/support-ticket.model';

@Component({
    selector: 'app-support',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        CommonModule
    ],
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
    ticketForm: FormGroup;
    tickets$!: Observable<SupportTicket[]>;
    isLoading = false;

    constructor(
        private formBuilder: FormBuilder,
        private supportService: SupportService,
        private authService: AuthService
    ) {
        this.ticketForm = this.formBuilder.group({
            subject: ['', Validators.required],
            priority: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadTickets();
    }

    private loadTickets(): void {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && currentUser.id) {
            this.tickets$ = this.supportService.getSupportTicketsForUser(currentUser.id);
        }
    }

    onSubmit(): void {
        if (this.ticketForm.valid) {
            this.isLoading = true;
            const currentUser = this.authService.getCurrentUser();

            if (currentUser && currentUser.id) {
                const newTicket: Partial<SupportTicket> = {
                    userId: currentUser.id,
                    subject: this.ticketForm.get('subject')?.value,
                    priority: this.ticketForm.get('priority')?.value,
                    description: this.ticketForm.get('description')?.value,
                    status: 'Open',
                    createdAt: new Date().toISOString()
                };

                this.supportService.createSupportTicket(newTicket).subscribe({
                    next: (response) => {
                        console.log('Ticket created successfully:', response);
                        this.ticketForm.reset();
                        this.loadTickets();
                        this.isLoading = false;
                    },
                    error: (error) => {
                        console.error('Error creating ticket:', error);
                        this.isLoading = false;
                    }
                });
            } else {
                console.error('User not found');
                this.isLoading = false;
            }
        } else {
            console.log('Form is invalid');
        }
    }

    getChipColor(status: string): string {
        switch (status) {
            case 'Open':
                return 'warn';
            case 'Solved':
                return 'primary';
            case 'In Progress':
                return 'accent';
            case 'Closed':
                return 'primary';
            default:
                return 'primary';
        }
    }
}
