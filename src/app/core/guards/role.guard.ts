import {inject} from '@angular/core';
import {Router, ActivatedRouteSnapshot} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {AuthService} from '../../features/auth/auth.service';

export const roleGuard = (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const allowedRoles = route.data['roles'] as string[];

    if (!allowedRoles || allowedRoles.length === 0) {
        return true; // Si no hay roles especificados, permitir acceso
    }

    return authService.currentUser$.pipe(
        take(1),
        map(user => {
            if (!user) {
                router.navigate(['/auth/login']);
                return false;
            }

            if (allowedRoles.includes(user.role)) {
                return true;
            } else {
                // Redirigir al dashboard correspondiente al rol del usuario
                switch (user.role) {
                    case 'ADMIN':
                        router.navigate(['/dashboard/admin']);
                        break;
                    case 'BREWMASTER':
                        router.navigate(['/dashboard/brewmaster']);
                        break;
                    case 'HOUSEHOLD_HEAD':
                        router.navigate(['/dashboard/household']);
                        break;
                    default:
                        router.navigate(['/dashboard/household']);
                        break;
                }
                return false;
            }
        })
    );
};
