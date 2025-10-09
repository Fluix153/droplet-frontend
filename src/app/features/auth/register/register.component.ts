import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 24px;">
      <mat-card style="max-width: 400px; text-align: center; padding: 32px;">
        <h1>Register</h1>
        <p>Registration form will be implemented here.</p>
        <button mat-raised-button color="primary" routerLink="/auth/login">
          Back to Login
        </button>
      </mat-card>
    </div>
  `
})
export class RegisterComponent { }
