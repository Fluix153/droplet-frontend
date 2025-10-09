import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Router, RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule, MatSidenav} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {CommonModule} from '@angular/common';
import {Subject, takeUntil} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AuthService} from '../../../features/auth/auth.service';
import {User} from '../../../features/auth/models/user.model';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule
    ],
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
    @ViewChild('sidenav') sidenav!: MatSidenav;

    currentUser: User | null = null;
    isMobile = false;
    private destroy$ = new Subject<void>();

    constructor(
        private authService: AuthService,
        private router: Router,
        private breakpointObserver: BreakpointObserver
    ) {
    }

    ngOnInit(): void {
        // Suscribirse a cambios del usuario actual
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
                this.currentUser = user;
            });

        // Detectar cambios de viewport para responsividad
        this.breakpointObserver.observe([Breakpoints.Handset])
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                this.isMobile = result.matches;
                // En móvil, el sidenav debe estar cerrado por defecto
                if (this.sidenav && this.isMobile) {
                    this.sidenav.mode = 'over';
                    this.sidenav.close();
                } else if (this.sidenav && !this.isMobile) {
                    this.sidenav.mode = 'side';
                    this.sidenav.open();
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    toggleSidenav(): void {
        if (this.sidenav) {
            this.sidenav.toggle();
        }
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }

    // Cerrar sidenav en móvil cuando se navega a una ruta
    onNavigate(): void {
        if (this.isMobile && this.sidenav) {
            this.sidenav.close();
        }
    }
}
