import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';
import { UrlService } from '../services/url/url.service';

export const dashboardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const urlService = inject(UrlService);
  urlService.previousDashboardGuardUrl.next(state.url);
    return authService.userAuthenticated().pipe(map(userAuthenticated=> userAuthenticated ? true : router.createUrlTree(['/auth'] )), catchError((err)=> {
      return of(router.createUrlTree(['/auth']));
    }));
};