import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../../../features/auth/auth.service';
import {User} from '../../../features/auth/models/user.model';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ],
    template: `
        <div class="dashboard-layout">
            <mat-toolbar color="primary" class="dashboard-header">
                <span class="logo">Droplet</span>
                <span class="spacer"></span>
                <span class="user-info" *ngIf="currentUser">
          Bienvenido, {{ currentUser.name }}
        </span>
                <button mat-icon-button (click)="logout()" class="logout-btn" title="Cerrar Sesión">
                    <mat-icon>logout</mat-icon>
                </button>
            </mat-toolbar>

            <main class="dashboard-content">
                <router-outlet></router-outlet>
            </main>
        </div>
    `,
    styles: [`
        .dashboard-layout {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        .dashboard-header {
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .spacer {
            flex: 1 1 auto;
        }

        .user-info {
            margin-right: 16px;
            font-size: 14px;
        }

        .logout-btn {
            margin-left: 8px;
        }

        .dashboard-content {
            flex: 1;
            overflow-y: auto;
            background-color: #f5f5f5;
        }

        .logo {
            font-weight: bold;
            font-size: 18px;
        }
    `]
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
    currentUser: User | null = null;
    private destroy$ = new Subject<void>();

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
                this.currentUser = user;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}
