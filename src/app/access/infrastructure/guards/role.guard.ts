import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AccessStore } from '../../application/access.store';
import { map, take } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const accessStore = inject(AccessStore);
  const router = inject(Router);

  return accessStore.currentUser$.pipe(
    take(1),
    map(user => {
      if (!user) {
        router.navigate(['/auth/login']);
        return false;
      }

      const requiredRoles = route.data['roles'] as string[];
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }

      const userRole = user.role?.toUpperCase();
      const hasRequiredRole = requiredRoles.includes(userRole || '');

      if (!hasRequiredRole) {
        // Redirigir a dashboard por defecto si no tiene el rol requerido
        router.navigate(['/dashboard/household']);
        return false;
      }

      return true;
    })
  );
};
