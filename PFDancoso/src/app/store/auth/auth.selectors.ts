import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { authFeatureKey } from './authFeatureKey';
import { RolType } from 'src/app/dashboard/users/models/rol.enum';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.authUser
);

export const selectUserRoles = createSelector(
  selectAuthUser,
  (state) => state?.roles
)


export const selectUserIsAdmin = createSelector(
  selectAuthUser,
  (state) => state?.roles.includes(RolType.Admin) ??  false
)
