import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, tap } from 'rxjs';
import { RolType } from 'src/app/dashboard/users/models/rol.enum';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.userHasRol$(RolType.Admin).pipe(
    map(auhtorized => auhtorized ? true : router.createUrlTree(['/auth/forbidden'])));
};