import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { authFeatureKey } from './authFeatureKey';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.authUser
);

export const selectUserRoles = createSelector(
  selectAuthUser,
  (state) => state?.roles
)
