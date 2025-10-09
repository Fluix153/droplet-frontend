import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {AuthService} from '../../features/auth/auth.service';
import {TokenService} from '../services/token.service';

export const authGuard = () => {
    const authService = inject(AuthService);
    const tokenService = inject(TokenService);
    const router = inject(Router);

    // Verificar si hay token y usuario autenticado
    const hasToken = tokenService.get() !== null;

    if (!hasToken) {
        router.navigate(['/auth/login']);
        return false;
    }

    // Verificar si hay usuario actual en el servicio
    return authService.currentUser$.pipe(
        take(1),
        map(user => {
            if (user) {
                return true;
            } else {
                // Si hay token pero no hay usuario en el servicio, limpiar y redirigir
                authService.logout();
                router.navigate(['/auth/login']);
                return false;
            }
        })
    );
};
