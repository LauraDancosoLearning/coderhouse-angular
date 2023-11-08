import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, tap } from 'rxjs';
import { UrlService } from '../services/url/url.service';

export const dashboardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const urlService = inject(UrlService);
  urlService.previousDashboardGuardUrl.next(state.url);
    return authService.user$.pipe(
    map(u => u != null ? true : router.createUrlTree(['/auth'])));
};