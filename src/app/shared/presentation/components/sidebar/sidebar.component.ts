import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AccessStore } from '../../../../access/application/access.store';
import { User } from '../../../../access/domain/models/user.entity';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {
  // Inyección de dependencias usando inject()
  private readonly store = inject(AccessStore);
  private readonly router = inject(Router);

  currentUser: User | null = null;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Suscribirse a cambios del usuario actual desde el AccessStore
    this.store.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User | null) => {
        this.currentUser = user;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout(): void {
    // Usar el AccessStore para logout
    this.store.logout();
    this.router.navigate(['/auth/login']);
  }
}
